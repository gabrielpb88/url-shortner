import { type AddUrlRepository } from '../../data/usecases/protocols/add-url-repository'
import { type ShortenUrlModel } from '../../domain/shorten-url/shorten-url.usecase'
import { MongoHelper } from './mongo-helper'
import { type FindUrlRepository } from '../../data/usecases/protocols/find-url-repository'

export class UrlMongoRepository implements AddUrlRepository, FindUrlRepository {
  async add (shortenedUrl: ShortenUrlModel): Promise<ShortenUrlModel> {
    const collection = await MongoHelper.getCollection('urls')
    const result = await collection.insertOne(shortenedUrl)
    const inserted = await collection.findOne(result.insertedId)
    return MongoHelper.map(inserted)
  }

  async find (short: string, expirationDate: Date): Promise<ShortenUrlModel> {
    const collection = await MongoHelper.getCollection('urls')
    const result = await collection.findOne({
      shortened: short,
      expirationDate: { $gt: expirationDate }
    })
    return result as unknown as ShortenUrlModel
  }
}
