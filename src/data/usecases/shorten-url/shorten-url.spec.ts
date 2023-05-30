import { ShortenUrl } from './shorten-url'
import { type ShortenUrlModel } from '../../../domain/shorten-url/shorten-url.usecase'
import { type Shortener } from '../protocols/shortener'

interface SutTypes {
  sut: ShortenUrl
  shortenerStub: Shortener
  expirationTimeInDays: number
}

const makeShortener = (): Shortener => {
  class ShortenerStub implements Shortener {
    async shorten (value: string): Promise<string> {
      return await new Promise((resolve) => { resolve('') })
    }
  }
  return new ShortenerStub()
}

const makeSut = (): SutTypes => {
  const expirationTimeInDays = 1
  const shortenerStub = makeShortener()
  const sut = new ShortenUrl(expirationTimeInDays, shortenerStub)
  return {
    sut,
    shortenerStub,
    expirationTimeInDays
  }
}

describe('ShortenUrl UseCase', () => {
  test('Should call Shorten with correct value', async () => {
    const { sut, shortenerStub } = makeSut()
    const url: ShortenUrlModel = {
      original: 'any_url'
    }
    const shortenerSpy = jest.spyOn(shortenerStub, 'shorten')
    await sut.shorten(url.original)
    expect(shortenerSpy).toHaveBeenCalledWith(url.original)
  })
})
