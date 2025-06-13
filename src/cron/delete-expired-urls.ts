import cron from 'node-cron'
import { type UrlService } from 'services/url.service'

export async function deleteUrlsJob(urlService: UrlService): Promise<void> {
  // Executes every day at midnight
  cron.schedule('0 0 * * *', () => {
    urlService.deleteExpiredUrls().catch(console.error)
  })
}
