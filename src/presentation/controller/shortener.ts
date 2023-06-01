import { type Controller } from '../protocols/controller'
import { type HttpRequest, type HttpResponse } from '../protocols/http'

export class ShortenerController implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.body.url) {
      const httpResponse = {
        statusCode: 400,
        body: new Error()
      }
      return httpResponse
    }
    return await new Promise((resolve) => {
      resolve({
        statusCode: 200,
        body: {}
      })
    }
    )
  }
}
