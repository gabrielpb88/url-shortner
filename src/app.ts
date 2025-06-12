import 'dotenv/config'
import express, { json } from 'express'
import { connectToMongo } from './db/mongo'
import { UrlService } from './services/url.service'
import { deleteUrlsJob } from './cron/delete-expired-urls'
import { createUrlRoutes } from './routes/url.routes'
import { logger } from './logger'

async function main(): Promise<void> {
  const app = express()
  app.use(json())

  const { urlsCollection } = await connectToMongo()
  const urlService = new UrlService(urlsCollection)

  deleteUrlsJob(urlService).catch(logger.error)

  app.use('/', createUrlRoutes(urlService))

  const { PORT = 3000 } = process.env
  app.listen(PORT, () => {
    logger.info({ port: PORT }, 'Server is running')
  })
}

main().catch(logger.error)
