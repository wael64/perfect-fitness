import type { NextApiRequest, NextApiResponse } from 'next'
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
import { buffer } from 'micro'
import mongooseConnect from '../../../utils/mongooseConnect'
import StripeModel from '../../../models/Stripe'

type Data = {
  status: 'success' | 'fail'
  message?: string
  session?: any
}

const handlePayment = async (session: any) => {
  await mongooseConnect()

  const subscription = await stripe.subscriptions.retrieve(session.subscription)

  console.log('handeling payment', { subscription, session })
  await StripeModel.updateOne(
    { customerId: session.customer },
    {
      membershipExpire: subscription.current_period_end,
      subscriptionId: session.subscription,
      subscriptionActive: true,
    },
    { upsert: true }
  )
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    const payload = (await buffer(req)).toString()
    const sig = req.headers['stripe-signature']?.toString()

    let event

    try {
      event = stripe.webhooks.constructEvent(payload, sig, process.env.NEXT_PUBLIC_STRIPE_ENDPOINT_SECRET)
    } catch (err: any) {
      console.log('webhook error ', err)
      return res
        .status(400)
        .json({ status: 'fail', message: `Webhook Error: ${err.message}` })
    }

    const session = event.data.object
    if (event.type === 'invoice.payment_succeeded') {
      await handlePayment(session)
    }

    res.status(200)
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
}
