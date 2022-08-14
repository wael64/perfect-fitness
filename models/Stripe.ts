import { Schema, model, models } from 'mongoose'

const StripeSchema = new Schema(
  {
    customerId: String,
    subscriptionId: String,
    membershipExpire: Number,
    subscriptionActive: Boolean,
  },
  { collection: 'stripe' }
)

const StripeModel = models.stripe || model('stripe', StripeSchema)

export default StripeModel
