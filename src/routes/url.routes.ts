import { Router } from 'express'
import { type UrlService } from '../services/url.service'
import { UrlController } from 'controllers/url.controller'

export function createUrlRoutes(urlService: UrlService): Router {
  const router = Router()
  const urlController = new UrlController(urlService)

  router.post('/', urlController.shortenUrl)
  router.get('/:shortUrl', urlController.getOriginalUrl)

  return router
}
