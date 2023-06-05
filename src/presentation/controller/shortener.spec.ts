import { ShortenerController } from './shortener'
import { type HttpRequest } from '../protocols/http'
import { ok } from '../helpers/http-helpers'
import { type ShortenUrlModel, type ShortenUrlUsecase } from '../../domain/shorten-url/shorten-url.usecase'
import { MissingParamError } from '../error/missing-param-error'

interface SutTypes {
  sut: ShortenerController
  shortenerStub: ShortenUrlUsecase
}

const makeSut = (): SutTypes => {
  const shortenerStub = makeShortenerStub()
  const sut = new ShortenerController(shortenerStub)
  return {
    sut,
    shortenerStub
  }
}

const makeShortenerStub = (): ShortenUrlUsecase => {
  class ShortenUrlUseCaseStub implements ShortenUrlUsecase {
    async shorten (url: string): Promise<ShortenUrlModel> {
      return await Promise.resolve({
        original: 'http://any_url.com',
        shortened: 'abc123'
      })
    }
  }
  return new ShortenUrlUseCaseStub()
}

const makeHttpRequest = (): HttpRequest => ({
  body: {
    url: 'http://any_url.com'
  }
})

describe('Shortener UseCase', () => {
  test('Should return 400 when no url is provided', async () => {
    const { sut } = makeSut()
    const httpRequest: HttpRequest = {
      body: {}
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual({ statusCode: 400, body: new MissingParamError('url') })
  })

  test('Should return 200 when correct value is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeHttpRequest())
    expect(httpResponse).toEqual(ok({
      original: 'http://any_url.com',
      short: 'http://localhost:8080/abc123'
    }))
  })
})
