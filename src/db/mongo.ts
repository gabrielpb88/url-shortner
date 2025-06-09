import { type Collection, type Db, MongoClient } from 'mongodb'
import { type Url } from '../interfaces/url.interface'

const url = process.env.MONGO_URL
const dbName = process.env.MONGO_DB_NAME
const client = new MongoClient(url)

export async function connectToMongo(): Promise<{
  db: Db
  urlsCollection: Collection<Url>
}> {
  try {
    await client.connect()
    console.log('Connected to MongoDB')

    const db = client.db(dbName)
    return {
      db,
      urlsCollection: db.collection<Url>('urls')
    }
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
    throw error
  }
}
