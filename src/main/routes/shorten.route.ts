import { type Router } from 'express'
import { ShortenerController } from '../../presentation/controller/shortener'
import { RandomShortenerAdapter } from '../../infra/shortener/random-shortener-adapter'
import { UrlMongoRepository } from '../../infra/db/url'
import { adaptRoute } from '../adapter/express-route-adapter'

export default (router: Router): void => {
  const randomShortener = new RandomShortenerAdapter()
  const addUrlRepository = new UrlMongoRepository()
  const shortenerController = new ShortenerController(randomShortener, addUrlRepository)
  router.post('/', adaptRoute(shortenerController))
}
