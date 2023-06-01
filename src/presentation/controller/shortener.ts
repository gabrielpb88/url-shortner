import { type Controller } from '../protocols/controller'
import { type HttpRequest, type HttpResponse } from '../protocols/http'
import { type Shortener } from '../../data/usecases/protocols/shortener'
import { badRequest, ok } from '../helpers/http-helpers'
import { type AddUrlRepository } from '../../data/usecases/protocols/add-url-repository'

export class ShortenerController implements Controller {
  constructor (private readonly shortener: Shortener,
    private readonly addUrlRepository: AddUrlRepository) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.body.url) {
      return badRequest(new Error())
    }
    const { url } = httpRequest.body
    const short = await this.shortener.shorten(url)
    const host = process.env.HOST || 'http://localhost:8080'

    await this.addUrlRepository.add({
      original: url,
      shorten: short
    })
    return ok({
      original: url,
      short: `${host}/${short}`
    })
  }
}
