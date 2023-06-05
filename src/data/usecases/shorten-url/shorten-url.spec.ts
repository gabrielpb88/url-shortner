import { ShortenUrl } from './shorten-url'
import { type ShortenUrlModel } from '../../../domain/shorten-url/shorten-url.usecase'
import { type Shortener } from '../protocols/shortener'
import { type AddUrlRepository } from '../protocols/add-url-repository'
import env from 'main/config/env'

interface SutTypes {
  sut: ShortenUrl
  shortenerStub: Shortener
  addUrlRepositoryStub: AddUrlRepository
  expirationTimeInDays: number
}

const makeShortener = (): Shortener => {
  class ShortenerStub implements Shortener {
    async shorten (value: string): Promise<string> {
      return await new Promise((resolve) => {
        resolve('shortened_url')
      })
    }
  }
  return new ShortenerStub()
}

const makeUrlRepository = (): AddUrlRepository => {
  class AddUrlRepositoryStub implements AddUrlRepository {
    async add (shortenedUrl: ShortenUrlModel): Promise<ShortenUrlModel> {
      return await new Promise((resolve) => {
        resolve({
          original: 'original_url',
          shortened: 'shortened_url'
        })
      }
      )
    }
  }
  return new AddUrlRepositoryStub()
}

const makeSut = (): SutTypes => {
  const { expirationTimeInDays } = env
  const shortenerStub = makeShortener()
  const addUrlRepositoryStub = makeUrlRepository()
  const sut = new ShortenUrl(Number(expirationTimeInDays), shortenerStub, addUrlRepositoryStub)
  return {
    sut,
    shortenerStub,
    addUrlRepositoryStub,
    expirationTimeInDays: Number(expirationTimeInDays)
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

  test('Should call AddUrlRepository with correct value', async () => {
    const { sut, shortenerStub, addUrlRepositoryStub } = makeSut()
    const repoSpy = jest.spyOn(addUrlRepositoryStub, 'add')
    jest.spyOn(shortenerStub, 'shorten').mockResolvedValue('shortened_url')
    const { expirationTimeInDays } = env
    const expirationDate = new Date()
    expirationDate.setDate(expirationDate.getDate() + Number(expirationTimeInDays))
    await sut.shorten('any_url')
    expect(repoSpy).toHaveBeenCalledWith({
      original: 'any_url',
      shortened: 'shortened_url',
      expirationDate
    })
  })
})
