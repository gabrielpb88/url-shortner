import { type Router } from 'express'
import { ShortenerController } from '../../presentation/controller/shortener'
import { RandomShortenerAdapter } from '../../infra/shortener/random-shortener-adapter'
import { UrlMongoRepository } from '../../infra/db/url'
import { adaptRoute } from '../adapter/express-route-adapter'
import { ShortenUrl } from '../../data/usecases/shorten-url/shorten-url'
import env from '../config/env'

export default (router: Router): void => {
  const { expirationTimeInDays } = env
  const randomShortener = new RandomShortenerAdapter()
  const addUrlRepository = new UrlMongoRepository()
  const shortenerUseCase = new ShortenUrl(Number(expirationTimeInDays), randomShortener, addUrlRepository)
  const shortenerController = new ShortenerController(shortenerUseCase)
  router.post('/', adaptRoute(shortenerController))
}
