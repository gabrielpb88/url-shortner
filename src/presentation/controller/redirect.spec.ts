import { type RedirectUrlUsecase } from '../../domain/redirect-url/redirect-url.usecase'
import { badRequest, notFound, redirect } from '../helpers/http-helpers'
import { RedirectController } from './redirect'

const makeFindUrlUseCaseStub = (): RedirectUrlUsecase => {
  class FindUrlUseCaseStub implements RedirectUrlUsecase {
    async find (short: string): Promise<string> {
      return await Promise.resolve('https://www.jusfy.com.br')
    }
  }
  return new FindUrlUseCaseStub()
}

interface SutTypes {
  sut: RedirectController
  findUrlUseCaseStub: RedirectUrlUsecase
}

const makeSut = (): SutTypes => {
  const findUrlUseCaseStub = makeFindUrlUseCaseStub()
  const sut = new RedirectController(findUrlUseCaseStub)
  return {
    sut, findUrlUseCaseStub
  }
}

describe('RedirectController', () => {
  test('Should return 400 when short is not provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(badRequest(new Error()))
  })
  test('Should return 400 when short is not found', async () => {
    const { sut, findUrlUseCaseStub } = makeSut()
    const httpRequest = ({
      short: 'abc123'
    })
    jest.spyOn(findUrlUseCaseStub, 'find').mockResolvedValue(null)
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(notFound())
  })

  test('Should return 302 when short is found', async () => {
    const { sut } = makeSut()
    const httpRequest = ({
      short: 'abc123'
    })
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(redirect('https://www.jusfy.com.br'))
  })
})
