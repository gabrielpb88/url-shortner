import { ShortenerController } from './shortener'
import { type HttpRequest } from '../protocols/http'
import { type Shortener } from '../../data/usecases/protocols/shortener'
import { ok } from '../helpers/http-helpers'
import { type AddUrlRepository } from '../../data/usecases/protocols/add-url-repository'
import { type ShortenUrlModel } from '../../domain/shorten-url/shorten-url.usecase'
import { MissingParamError } from '../error/missing-param-error'

interface SutTypes {
  sut: ShortenerController
  shortenerStub: Shortener
  addUrlRepositoryStub: AddUrlRepository
}

const makeSut = (): SutTypes => {
  const shortenerStub = makeShortenerStub()
  const addUrlRepositoryStub = makeAddUrlRepositoryStub()
  const sut = new ShortenerController(shortenerStub, addUrlRepositoryStub)
  return {
    sut,
    shortenerStub,
    addUrlRepositoryStub
  }
}

const makeShortenerStub = (): Shortener => {
  class ShortenerStub implements Shortener {
    async shorten (value: string): Promise<string> {
      return await Promise.resolve('abc123')
    }
  }
  return new ShortenerStub()
}

const makeAddUrlRepositoryStub = (): AddUrlRepository => {
  class AddUrlRepositoryStub implements AddUrlRepository {
    async add (shortenedUrl: ShortenUrlModel): Promise<ShortenUrlModel> {
      return await Promise.resolve(null)
    }
  }
  return new AddUrlRepositoryStub()
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

  test('Should call Shortener with correct value', async () => {
    const { sut, shortenerStub } = makeSut()
    const shortenerSpy = jest.spyOn(shortenerStub, 'shorten')
    const httpRequest = makeHttpRequest()
    await sut.handle(httpRequest)
    expect(shortenerSpy).toHaveBeenCalledWith(httpRequest.body.url)
  })

  test('Should return 200 when correct value is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeHttpRequest())
    expect(httpResponse).toEqual(ok({
      original: 'http://any_url.com',
      short: 'http://localhost:8080/abc123'
    }))
  })

  test('Should call ShortenUrlRepository with correct value', async () => {
    const { sut, addUrlRepositoryStub } = makeSut()
    const repoSpy = jest.spyOn(addUrlRepositoryStub, 'add')
    await sut.handle(makeHttpRequest())
    expect(repoSpy).toHaveBeenCalledWith({
      original: 'http://any_url.com',
      shorten: 'abc123'
    })
  })
})
