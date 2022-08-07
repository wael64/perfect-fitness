import { Schema, SchemaTypes, model, models } from 'mongoose'

const PostSchema = new Schema<PostType>({
  title: String,

  createdAt: Date,
  cover: { type: SchemaTypes.ObjectId, ref: 'upload_file' },
  created_by: { type: SchemaTypes.ObjectId, ref: 'strapi_administrator' },
  category: [
    {
      ref: { type: SchemaTypes.ObjectId, ref: 'components_shared_categories' },
    },
  ],
})

const Post = models.post || model<PostType>('post', PostSchema)

export default Post
