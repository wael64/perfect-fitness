import type { NextApiRequest, NextApiResponse } from 'next'
import mongooseConnect from '../../utils/mongooseConnect'
import User from '../../models/User'

type Data = {
  status: 'success' | 'fail'
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    try {
      await mongooseConnect()
      const { name, email, phone, role } = req.body

      await User.updateOne({ email }, { phone, name, role }, { upsert: true })

      res.status(200).json({ status: 'success' })
    } catch (err) {
      console.log('update user error ', err)
      res.status(400).json({ status: 'fail' })
    }
  }
}
