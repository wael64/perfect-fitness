import { Schema, model, models } from 'mongoose'

const UploadFileSchema = new Schema({}, { collection: 'upload_file' })

const UploadFile =
  models['upload_file'] || model('upload_file', UploadFileSchema)

export default UploadFile
