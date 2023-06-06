import { type Controller } from '../protocols/controller'
import { type HttpResponse } from '../protocols/http'
import { type RedirectUrlUsecase } from '../../domain/redirect-url/redirect-url.usecase'
import { badRequest, notFound } from '../helpers/http-helpers'

export class RedirectController implements Controller {
  constructor (private readonly redirectUrlUseCase: RedirectUrlUsecase) {}

  async handle (httpRequest: any): Promise<HttpResponse> {
    const { short } = httpRequest
    if (!short) {
      return badRequest(new Error())
    }
    const url = await this.redirectUrlUseCase.find(short)
    if (!url) {
      return notFound()
    }
    const httpResponse: HttpResponse = {
      statusCode: 302,
      body: {},
      location: url
    }
    return httpResponse
  }
}
