import { UrlMongoRepository } from './url'
import { MongoHelper } from './mongo-helper'

describe('URL Mongo Repository ', () => {
  beforeAll(async () => {
    await MongoHelper.connect('mongodb://localhost:27017/jusfy')
  })

  beforeEach(async () => {
    await (await MongoHelper.getCollection('urls')).deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('Should return an url model on success', async () => {
    const sut = new UrlMongoRepository()
    const expirationDate = new Date(new Date().setDate(new Date().getDate() + 5))
    const url = await sut.add({
      original: 'http://www.jusfy.com.br',
      shorten: 'abc123',
      expirationDate
    })
    expect(url).toBeTruthy()
    expect(url.original).toBe('http://www.jusfy.com.br')
    expect(url.shorten).toBe('abc123')
    expect(url.expirationDate).toEqual(expirationDate)
  })
})
