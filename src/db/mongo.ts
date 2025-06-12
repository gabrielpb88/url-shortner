import { type Collection, type Db, MongoClient } from 'mongodb'
import { type Url } from '../interfaces/url.interface'
import { logger } from '../logger'

export async function connectToMongo(): Promise<{
  db: Db
  urlsCollection: Collection<Url>
}> {
  try {
    const url = process.env.MONGO_URL
    const dbName = process.env.MONGO_DB_NAME
    const client = new MongoClient(url)

    await client.connect()

    const db = client.db(dbName)
    return {
      db,
      urlsCollection: db.collection<Url>('urls'),
    }
  } catch (error) {
    logger.error(error, 'Error connecting to MongoDB')
    throw error
  }
}
