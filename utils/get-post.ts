import mongooseConnect from '../utils/mongooseConnect'
import Post from '../models/Post'
import UploadFile from '../models/UploadFile'
import Category from '../models/Category'
import AdminUser from '../models/AdminUser'

const getPost = async (id: string) => {
  try {
    await mongooseConnect()

    // Initializing the schemas
    const coverSchema = UploadFile
    const categorySchema = Category
    const adminUserSchema = AdminUser

    const post = await Post.findById(id)
      .populate('cover', 'formats')
      .populate('category.ref')
      .populate('created_by', { firstname: 1, lastname: 1 })
      .lean()

    if (post === null) {
      return {}
    }

    const stringifiedPost = JSON.stringify(post)
    const parsedPost = JSON.parse(stringifiedPost)

    return parsedPost
  } catch (err) {
    console.log('Get post err', err)
    return {}
  }
}

export default getPost
