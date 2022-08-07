import { Schema, SchemaTypes, model, models } from 'mongoose'

const UserSchema = new Schema({
  name: String,
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  // likes: SchemaTypes.ObjectId,
  image: String,
  phone: String,
})

const User = models.user || model('user', UserSchema)

export default User
