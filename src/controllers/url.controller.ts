import { type Request, type Response } from 'express'
import { type UrlService } from 'services/url.service'

export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  shortenUrl = async (req: Request, res: Response): Promise<any> => {
    const { url } = req.body
    if (!url) {
      return res.status(400).json({ error: 'URL is required' })
    }
    try {
      const shortUrl = await this.urlService.shortenUrl(url)
      return res.status(201).json({ shortUrl })
    } catch (error) {
      return res.status(500).json({ error })
    }
  }

  getOriginalUrl = async (req: Request, res: Response): Promise<any> => {
    const { shortUrl } = req.params
    if (!shortUrl) {
      return res.status(400).json({ error: 'ShortUrl is required' })
    }

    try {
      const originalUrl = await this.urlService.getOriginalUrl(shortUrl)
      if (originalUrl) {
        return res.redirect(originalUrl)
      } else {
        return res.status(404).json({ error: 'Short URL not found' })
      }
    } catch (error) {
      return res.status(500).json({ error })
    }
  }
}
