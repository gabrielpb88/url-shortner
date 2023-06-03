import { type AddUrlRepository } from '../../data/usecases/protocols/add-url-repository'
import { type ShortenUrlModel } from '../../domain/shorten-url/shorten-url.usecase'
import { MongoHelper } from './mongo-helper'

export class UrlMongoRepository implements AddUrlRepository {
  async add (shortenedUrl: ShortenUrlModel): Promise<ShortenUrlModel> {
    const collection = await MongoHelper.getCollection('urls')
    const result = await collection.insertOne(shortenedUrl)
    const inserted = await collection.findOne(result.insertedId)
    return MongoHelper.map(inserted)
  }
}
