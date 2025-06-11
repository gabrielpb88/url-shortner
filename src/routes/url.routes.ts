import { Router } from 'express'
import { type UrlService } from '../services/url.service'

export function createUrlRoutes(urlService: UrlService): Router {
  const router = Router()

  router.post('/', async (req, res) => {
    const { url } = req.body
    if (!url) {
      return res.status(400).json({ error: 'URL is required' })
    }
    const shortUrl = await urlService.shortenUrl(url)
    res.status(201).json({ shortUrl })
  })

  router.get('/:shortUrl', async (req, res) => {
    const { shortUrl } = req.params

    const originalUrl = await urlService.getOriginalUrl(shortUrl)

    if (originalUrl) {
      res.redirect(originalUrl)
    } else {
      res.status(404).json({ error: 'Short URL not found' })
    }
  })

  return router
}
