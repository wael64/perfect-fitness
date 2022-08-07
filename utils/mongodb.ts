import { MongoClient, MongoClientOptions } from 'mongodb'

const uri = process.env.MONGODB_URI!
const options: MongoClientOptions = {}
let client
let clientPromise: any

const globalObject: any = global

try {
  if (process.env.NODE_ENV === 'development') {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR (Hot Module Replacement).
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

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise
