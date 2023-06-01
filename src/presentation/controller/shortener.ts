import { type Controller } from '../protocols/controller'
import { type HttpRequest, type HttpResponse } from '../protocols/http'
import { type Shortener } from '../../data/usecases/protocols/shortener'

export class ShortenerController implements Controller {
  constructor (private readonly shortener: Shortener) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.body.url) {
      const httpResponse = {
        statusCode: 400,
        body: new Error()
      }
      return httpResponse
    }
    const { url } = httpRequest.body
    await this.shortener.shorten(url)
    return await new Promise((resolve) => {
      resolve({
        statusCode: 200,
        body: {}
      })
    })
  }
}
