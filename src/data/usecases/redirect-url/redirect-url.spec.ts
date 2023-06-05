import { type FindUrlRepository } from '../protocols/find-url-repository'
import { RedirectUrl } from './redirect-url'
import { type ShortenUrlModel } from '../../../domain/shorten-url/shorten-url.usecase'

const makeFindUrlRepositoryStub = (): FindUrlRepository => {
  class FindUrlRepositoryStub implements FindUrlRepository {
    async find (short: string, expirationDate: Date): Promise<ShortenUrlModel> {
      return await Promise.resolve(undefined)
    }
  }
  return new FindUrlRepositoryStub()
}

interface SutTypes {
  findUrlRepositoryStub: FindUrlRepository
  sut: RedirectUrl
}

const makeSut = (): SutTypes => {
  const findUrlRepositoryStub = makeFindUrlRepositoryStub()
  const sut = new RedirectUrl(findUrlRepositoryStub)
  return {
    sut, findUrlRepositoryStub
  }
}

describe('RedirectUrl UseCase', () => {
  test('Should call repository with correct value', async () => {
    const { sut, findUrlRepositoryStub } = makeSut()
    const short = 'abc123'
    const date = new Date()
    date.setUTCHours(23, 59, 59, 999)
    const repoSpy = jest.spyOn(findUrlRepositoryStub, 'find')
    await sut.find(short)
    expect(repoSpy).toHaveBeenCalledWith(short, date)
  })
})
