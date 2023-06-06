import { type Router } from 'express'
import { adaptRoute } from '../adapter/express-route-adapter'
import { RedirectController } from '../../presentation/controller/redirect'
import { RedirectUrl } from '../../data/usecases/redirect-url/redirect-url'
import { UrlMongoRepository } from '../../infra/db/url'

export default (router: Router): void => {
  const urlMongoRepository = new UrlMongoRepository()
  const redirectUseCase = new RedirectUrl(urlMongoRepository)
  const redirectController = new RedirectController(redirectUseCase)
  router.get('/:short', adaptRoute(redirectController))
}
