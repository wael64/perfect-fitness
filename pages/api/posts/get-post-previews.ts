import type { NextApiRequest, NextApiResponse } from 'next'
import mongooseConnect from '../../../utils/mongooseConnect'
import Post from '../../../models/Post'
import UploadFile from '../../../models/UploadFile'
import Category from '../../../models/Category'
import AdminUser from '../../../models/AdminUser'

type Data = {
  status: 'success' | 'fail'
  posts?: PostType[]
  count?: number
}

async function getPostsByCategory(
  category: string,
  page: number
): Promise<{ posts: PostType[]; count: number }> {
  // Get all the category objects where the provided category is set to true, then get the post that has a refrence to each category object, then get the count of the posts where the provided category is true
  const categoryPosts = await Category.aggregate([
    {
      $facet: {
        data: [
          { $match: { [category]: true } },
          {
            $lookup: {
              from: 'posts',
              localField: '_id',
              foreignField: 'category.ref',
              as: 'post',
            },
          },
          {
            $project: {
              nutrition: 1,
              exercise: 1,
              'post._id': 1,
              'post.title': 1,
              'post.cover': 1,
              'post.alt': 1,
              'post.description': 1,
              'post.createdAt': 1,
              'post.created_by': 1,
            },
          },
          { $sort: { 'post.createdAt': -1 } },
          { $skip: page * 5 },
          { $limit: 5 },
        ],
        count: [{ $match: { [category]: true } }, { $count: 'count' }],
      },
    },
  ])

  // Populate the category field
  await UploadFile.populate(categoryPosts[0].data, {
    path: 'post.cover',
    select: { formats: 1 },
  })

  // Populate the created_by field
  await AdminUser.populate(categoryPosts[0].data, {
    path: 'post.created_by',
    select: { firstname: 1, lastname: 1 },
  })

  // Format the category object the same way as the posts
  return {
    posts: categoryPosts[0].data.map((item: any) => {
      let { post, ...category } = item
      post[0].category = [{ ref: category }]
      return post[0]
    }),
    count: categoryPosts[0].count[0].count,
  }
}

async function getPosts(
  page: number
): Promise<{ posts: PostType[]; count: number }> {
  const posts = await Post.find(
    {},
    {
      title: 1,
      cover: 1,
      description: 1,
      alt: 1,
      createdAt: 1,
      category: 1,
    }
  )
    .populate('cover', 'formats')
    .populate('category.ref')
    .populate('created_by', { firstname: 1, lastname: 1 })
    .sort({ createdAt: -1 })
    .skip(page * 5)
    .limit(5)

  const count: number = await Post.find({}).count()
  return { posts, count }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'GET') {
    try {
      await mongooseConnect()

      // Initializing the schemas
      const coverSchema = UploadFile
      const categorySchema = Category
      const adminUserSchema = AdminUser

      // If the page param is provided, pass the page - 1 to skip()
      let page
      if (typeof req?.query?.page === 'string') {
        page = Number(req?.query?.page) - 1
      } else {
        page = 0
      }

      // If the category param is provided, return the category posts
      if (typeof req?.query?.category === 'string') {
        const data = await getPostsByCategory(req?.query?.category, page)

        return res
          .status(200)
          .json({ status: 'success', posts: data.posts, count: data.count })
      }

      // If no category is provided, get all the posts and the count of those posts
      const data: { posts: PostType[]; count: number } = await getPosts(page)

      return res
        .status(200)
        .json({ status: 'success', posts: data.posts, count: data.count })
    } catch (err) {
      console.log('Get post previews error ', err)
      res.status(400).json({ status: 'fail' })
    }
  }
}
