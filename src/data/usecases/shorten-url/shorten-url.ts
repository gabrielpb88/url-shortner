import { type ShortenUrlModel, type ShortenUrlUsecase } from 'domain/shorten-url/shorten-url.usecase'
import { type Shortener } from '../protocols/shortener'
import { type AddUrlRepository } from '../protocols/add-url-repository'

export class ShortenUrl implements ShortenUrlUsecase {
  constructor (
    private readonly expirationTimeInDays: number,
    private readonly shortener: Shortener,
    private readonly addUrlRepository: AddUrlRepository
  ) {}

  async shorten (url: string): Promise<ShortenUrlModel> {
    const shortenedUrl = { original: url, shortened: await this.shortener.shorten(url) }
    return await this.addUrlRepository.add(shortenedUrl)
  }
}
