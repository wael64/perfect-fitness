import type { NextApiRequest, NextApiResponse } from 'next'
import mongooseConnect from '../../../utils/mongooseConnect'
import Post from '../../../models/Post'
import UploadFile from '../../../models/UploadFile'
import Category from '../../../models/Category'
import AdminUser from '../../../models/AdminUser'

type Data = {
  status: 'success' | 'fail'
  message?: any
  post?: PostType
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'GET') {
    try {
      await mongooseConnect()
      if (typeof req?.query?.id !== 'string')
        return res
          .status(400)
          .json({ status: 'fail', message: 'id field required' })

      // Initializing the schemas
      const coverSchema = UploadFile
      const categorySchema = Category
      const adminUserSchema = AdminUser

      const post = await Post.findById(req?.query?.id)
        .populate('cover', 'formats')
        .populate('category.ref')
        .populate('created_by', { firstname: 1, lastname: 1 })

      if (post === null) {
        return res
          .status(400)
          .json({ status: 'fail', message: 'Post not found' })
      }

      return res.status(200).json({ status: 'success', post })
    } catch (err) {
      console.log('Get post err', err)
      return res.status(400).json({ status: 'fail', message: err })
    }
  }
}
