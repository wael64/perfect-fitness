import type { NextApiRequest, NextApiResponse } from 'next'
import mongooseConnect from '../../../utils/mongooseConnect'
import StripeModel from '../../../models/Stripe'
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
import { getToken } from 'next-auth/jwt'

type Data = {
  status: 'success' | 'fail'
  message?: any
  session?: any
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    try {
      const token = await getToken({ req })
      if (typeof req?.body?.priceId !== 'string' || !token?.stripeCustomerId)
        return res
          .status(400)
          .json({ status: 'fail', message: 'please provide the price id' })

      const priceId = req.body.priceId

      const sessionOptions = {
        mode: 'subscription',
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        subscription_data: {},
        customer: token.stripeCustomerId,
        success_url: `${process.env.NEXT_PUBLIC_DOMAIN_URL}/account`,
        cancel_url: `${process.env.NEXT_PUBLIC_DOMAIN_URL}/#plans`,
      }

      await mongooseConnect()
      const stripeData = await StripeModel.findOne({
        customerId: token.stripeCustomerId,
      })

      // Check if the user has a stripe object, and if it does, check if his membership hasn't expired yet to add the remaining days to the new membership's trial period.
      if (stripeData) {
        const date = new Date(stripeData.membershipExpire * 1000)
        const today = new Date()

        today.setHours(0, 0, 0, 0)

        if (date > today) {
          sessionOptions.subscription_data = {
            trial_end: stripeData.membershipExpire,
          }
        }
      }

      const session = await stripe.checkout.sessions.create(sessionOptions)

      res.status(200).json({ status: 'success', session })
    } catch (err) {
      console.log('Buy subscription error', err)
      res.status(400).json({ status: 'fail', message: err })
    }
  }
}
