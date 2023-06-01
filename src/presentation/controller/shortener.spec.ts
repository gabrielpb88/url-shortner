import { ShortenerController } from './shortener'
import { type HttpRequest } from '../protocols/http'
import { type Shortener } from '../../data/usecases/protocols/shortener'

interface SutTypes {
  sut: ShortenerController
  shortenerStub: Shortener
}

const makeSut = (): SutTypes => {
  const shortenerStub = makeShortenerStub()
  const sut = new ShortenerController(shortenerStub)
  return {
    sut,
    shortenerStub
  }
}

const makeShortenerStub = (): Shortener => {
  class ShortenerStub implements Shortener {
    async shorten (value: string): Promise<string> {
      return await Promise.resolve('')
    }
  }
  return new ShortenerStub()
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
    expect(httpResponse).toEqual({ statusCode: 400, body: new Error() })
  })

  test('Should call Shortener with correct value', async () => {
    const { sut, shortenerStub } = makeSut()
    const shortenerSpy = jest.spyOn(shortenerStub, 'shorten')
    const httpRequest = makeHttpRequest()
    await sut.handle(httpRequest)
    expect(shortenerSpy).toHaveBeenCalledWith(httpRequest.body.url)
  })
})
