import type { NextApiRequest, NextApiResponse } from 'next'
import Fuse from 'fuse.js'
import fuseData from '../../../data/fuseData.json'
import mongoose from 'mongoose'
import mongooseConnect from '../../../utils/mongooseConnect'
import Post from '../../../models/Post'
import UploadFile from '../../../models/UploadFile'
import Category from '../../../models/Category'
import AdminUser from '../../../models/AdminUser'

type Data = {
  status: 'success' | 'fail'
  posts?: PostType[]
  count?: number
  message?: string
}

async function getPostsByCategory(
  category: string,
  page: number,
  ids: mongoose.Types.ObjectId[]
): Promise<{ posts: PostType[]; count: number }> {
  const categoryPosts = await Category.aggregate([
    {
      $facet: {
        data: [
          { $match: { [category]: true, _id: { $in: ids } } },
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
        count: [
          { $match: { [category]: true, _id: { $in: ids } } },
          { $count: 'count' },
        ],
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
  page: number,
  ids: string[]
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
    .where('_id')
    .in(ids)
    .populate('cover', 'formats')
    .populate('category.ref')
    .populate('created_by', { firstname: 1, lastname: 1 })
    .sort({ createdAt: -1 })
    .skip(page * 5)
    .limit(5)

  const count: number = await Post.find({}).where('_id').in(ids).count()
  return { posts, count }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'GET') {
    try {
      await mongooseConnect()

      const fuse = new Fuse(fuseData, { includeScore: true, keys: ['title'] })

      let results: Fuse.FuseResult<{
        _id: string
        title: string
        createdAt: string
        category: string
      }>[]

      if (typeof req?.query?.searchQuery === 'string') {
        results = fuse.search(req?.query?.searchQuery)
      } else {
        return res
          .status(400)
          .json({ status: 'fail', message: 'Search query was not provided' })
      }

      let page
      if (typeof req?.query?.page === 'string') {
        page = Number(req?.query?.page) - 1
      } else {
        page = 0
      }

      // If the category param is provided, search within the posts with the specified category
      if (typeof req?.query?.category === 'string') {
        const ids = results.map((result) => {
          return new mongoose.Types.ObjectId(result.item.category)
        })

        const data = await getPostsByCategory(req?.query?.category, page, ids)

        return res
          .status(200)
          .json({ status: 'success', posts: data.posts, count: data.count })
      }

      const pageResults = results.slice(page * 5, page * 5 + 5)

      const ids = pageResults.map((pageResult) => pageResult.item._id)

      // Initializing the schemas
      const coverSchema = UploadFile
      const categorySchema = Category
      const adminUserSchema = AdminUser

      const data: { posts: PostType[]; count: number } = await getPosts(
        page,
        ids
      )

      return res
        .status(200)
        .json({ status: 'success', posts: data.posts, count: data.count })
    } catch (err) {
      console.log('Get post previews error ', err)
      res.status(400).json({ status: 'fail' })
    }
  }
}
