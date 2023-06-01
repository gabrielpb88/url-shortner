import { ShortenerController } from './shortener'
import { type HttpRequest } from '../protocols/http'

interface SutTypes {
  sut: ShortenerController
}

const makeSut = (): SutTypes => {
  const sut = new ShortenerController()
  return {
    sut
  }
}

describe('Shortener UseCase', () => {
  test('Should return 400 when no url is provided', async () => {
    const { sut } = makeSut()
    const httpRequest: HttpRequest = {
      body: {}
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual({ statusCode: 400, body: new Error() })
  })
})
