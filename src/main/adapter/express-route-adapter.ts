import { type Request, type Response } from 'express'
import { type Controller } from '../../presentation/protocols/controller'
import { type HttpRequest } from '../../presentation/protocols/http'

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body,
      short: req.params.short
    }
    const httpResponse = await controller.handle(httpRequest)
    if (httpResponse.statusCode === 200) {
      return res.status(httpResponse.statusCode).send(httpResponse.body)
    }
    if (httpResponse.statusCode === 302) {
      return res.redirect(httpResponse.statusCode, httpResponse.location)
    }
    if (httpResponse.statusCode === 404) {
      return res.sendStatus(httpResponse.statusCode)
    } else {
      return res.status(httpResponse.statusCode).json({
        error: httpResponse.body?.message
      })
    }
  }
}
