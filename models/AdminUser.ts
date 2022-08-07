import { Schema, model, models } from 'mongoose'

const AdminUserSchema = new Schema({}, { collection: 'strapi_administrator' })

const AdminUser =
  models['strapi_administrator'] ||
  model('strapi_administrator', AdminUserSchema)

export default AdminUser
