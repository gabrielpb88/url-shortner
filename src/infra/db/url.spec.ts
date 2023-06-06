import { UrlMongoRepository } from './url'
import { MongoHelper } from './mongo-helper'

describe('URL Mongo Repository ', () => {
  beforeAll(async () => {
    await MongoHelper.connect('mongodb://localhost:27017/jusfy_test')
  })

  beforeEach(async () => {
    await (await MongoHelper.getCollection('urls')).deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('Should return an url model on success when inserting an url', async () => {
    const sut = new UrlMongoRepository()
    const expirationDate = new Date(new Date().setDate(new Date().getDate() + 5))
    const url = await sut.add({
      original: 'http://www.jusfy.com.br',
      shortened: 'abc123',
      expirationDate
    })
    expect(url).toBeTruthy()
    expect(url.original).toBe('http://www.jusfy.com.br')
    expect(url.shortened).toBe('abc123')
    expect(url.expirationDate).toEqual(expirationDate)
  })

  test('Should return an url model on success', async () => {
    const sut = new UrlMongoRepository()
    await sut.add({
      original: 'http://www.jusfy.com.br',
      shortened: 'abc123',
      expirationDate: new Date(new Date().setDate(new Date().getDate() + 5))
    })
    const url = await sut.find('abc123', new Date())
    expect(url).toBeTruthy()
    expect(url.original).toBe('http://www.jusfy.com.br')
    expect(url.shortened).toBe('abc123')
  })

  test('Should return null when url is not found', async () => {
    const sut = new UrlMongoRepository()
    const url = await sut.find('not_found_url', new Date())
    expect(url).toBeFalsy()
  })
})
