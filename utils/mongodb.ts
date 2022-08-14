import { MongoClient, MongoClientOptions } from 'mongodb'

const uri = process.env.MONGODB_URI!
const options: MongoClientOptions = {}
let client
let clientPromise: any

const globalObject: any = global

try {
  if (process.env.NODE_ENV === 'development') {
    if (!globalObject._mongoClientPromise) {
      client = new MongoClient(uri, options)
      globalObject._mongoClientPromise = client.connect()
    }
    clientPromise = globalObject._mongoClientPromise
  } else {
    // In production mode, it's best to not use a global variable.
    client = new MongoClient(uri)
    clientPromise = client.connect()
  }
} catch (err) {
  console.log({ mongoErr: err })
}

export default clientPromise
