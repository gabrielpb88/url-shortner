import { type Controller } from '../protocols/controller'
import { type HttpRequest, type HttpResponse } from '../protocols/http'
import { badRequest, ok } from '../helpers/http-helpers'
import { MissingParamError } from '../error/missing-param-error'
import { type ShortenUrlUsecase } from '../../domain/shorten-url/shorten-url.usecase'

export class ShortenerController implements Controller {
  constructor (private readonly shortenUrlUseCase: ShortenUrlUsecase) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.body.url) {
      return badRequest(new MissingParamError('url'))
    }
    const { url } = httpRequest.body
    const host = process.env.HOST || 'http://localhost:8080'
    const short = await this.shortenUrlUseCase.shorten(url)

    return ok({
      original: url,
      short: `${host}/${short.shortened}`
    })
  }
}
