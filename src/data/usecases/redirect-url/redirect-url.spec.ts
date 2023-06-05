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

  test('Should return original url found by short', async () => {
    const { sut, findUrlRepositoryStub } = makeSut()
    const short = 'any_short'
    const date = new Date()
    const repositoryResponse: ShortenUrlModel = {
      original: 'www.jusfy.com.br',
      shorten: 'any_short',
      expirationDate: date
    }
    jest.spyOn(findUrlRepositoryStub, 'find').mockResolvedValue(repositoryResponse)
    const response = await sut.find(short)
    expect(response).toBe(repositoryResponse.original)
  })

  test('Should return Falsy when url is not found', async () => {
    const { sut } = makeSut()
    const response = await sut.find('any_short')
    expect(response).toBeFalsy()
  })
})
