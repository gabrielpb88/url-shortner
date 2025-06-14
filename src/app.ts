/* istanbul ignore file */
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

  const { db, urlsCollection } = await connectToMongo()
  const urlService = new UrlService(urlsCollection)

  deleteUrlsJob(urlService).catch(logger.error)

  app.get('/health', async (req, res) => {
    try {
      await db.command({ ping: 1 })
      res.status(200).json({ status: 'ok' })
    } catch (err) {
      res.status(500).json({ status: 'error', error: (err as Error).message })
    }
  })
  app.use('/', createUrlRoutes(urlService))

  const { PORT = 80 } = process.env
  app.listen(PORT, () => {
    logger.info({ port: PORT }, 'Server is running')
  })
}

main().catch(logger.error)
