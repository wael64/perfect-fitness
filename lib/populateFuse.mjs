import fs from 'fs'
import mongoose from 'mongoose'
import 'dotenv/config'

const { Schema, model, models } = mongoose

async function populate() {
  if (mongoose.connection.readyState >= 1) {
    return mongoose.connection.db
  }

  await mongoose.connect(process.env.MONGODB_URI, {
    dbName: 'perfect-fitness',
  })

  const PostSchema = new Schema({
    title: String,
  })

  const Post = models.post || model('post', PostSchema)

  const posts = await Post.find(
    {},
    {
      title: 1,
      createdAt: 1,
      'category.ref': 1,
    }
  ).lean()

  const formatedPosts = posts.map((post) => {
    return {
      _id: post._id,
      title: post.title,
      createdAt: post.createdAt,
      category: post.category[0].ref,
    }
  })

  fs.writeFile('./data/fuseData.json', JSON.stringify(formatedPosts), (err) => {
    if (err) {
      console.error(err)
    }
  })
}

populate()
