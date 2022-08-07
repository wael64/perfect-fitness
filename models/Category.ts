import { Schema, SchemaTypes, model, models } from 'mongoose'

const CategorySchema = new Schema(
  {
    _id: SchemaTypes.ObjectId,
  },
  { collection: 'components_shared_categories' }
)

const Category =
  models['components_shared_categories'] ||
  model('components_shared_categories', CategorySchema)

export default Category
