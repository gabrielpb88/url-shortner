import 'dotenv/config'
import express, { json } from 'express'
import { connectToMongo } from './db/mongo'
import { UrlService } from './urlService'
import { deleteUrlsJob } from './cron/deleteExpiredUrls'
import { createUrlRoutes } from './routes/urlRoutes'

async function main(): Promise<void> {
  const app = express()
  app.use(json())

  const { urlsCollection } = await connectToMongo()
  const urlService = new UrlService(urlsCollection)

  deleteUrlsJob(urlService).catch(console.error)

  app.use('/', createUrlRoutes(urlService))

  const { PORT = 3000 } = process.env
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })
}

main().catch(console.error)
