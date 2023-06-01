import { type Controller } from '../protocols/controller'
import { type HttpRequest, type HttpResponse } from '../protocols/http'
import { type Shortener } from '../../data/usecases/protocols/shortener'
import { badRequest, ok } from '../helpers/http-helpers'

export class ShortenerController implements Controller {
  constructor (private readonly shortener: Shortener) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.body.url) {
      return badRequest(new Error())
    }
    const { url } = httpRequest.body
    await this.shortener.shorten(url)
    return ok({})
  }
}
