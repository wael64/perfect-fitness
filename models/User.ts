import { Schema, SchemaTypes, model, models } from 'mongoose'

const UserSchema = new Schema({
  name: String,
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  image: String,
  phone: String,
  stripeCustomerId: String,
  membershipExpire: Number,
  subscriptionId: String,
})

const User = models.user || model('user', UserSchema)

export default User
