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
  if (req.method === 'DELETE') {
    try {
      const token = await getToken({ req })

      if (!token?.stripeCustomerId)
        return res
          .status(400)
          .json({ status: 'fail', message: 'Please sign in' })

      await mongooseConnect()

      const stripeData = await StripeModel.findOne({
        customerId: token.stripeCustomerId,
      })

      if (!stripeData)
        return res.status(400).json({
          status: 'fail',
          message: "Customer doesn't have a subscription",
        })

      await StripeModel.updateOne(
        {
          customerId: token.stripeCustomerId,
        },
        { subscriptionActive: false }
      )

      await stripe.subscriptions.del(stripeData.subscriptionId)

      return res.status(200).json({ status: 'success' })
    } catch (err) {
      return res.status(400).json({ status: 'fail', message: err })
    }
  }
}
