import { type ShortenUrlModel, type ShortenUrlUsecase } from 'domain/shorten-url/shorten-url.usecase'
import { type Shortener } from '../protocols/shortener'

export class ShortenUrl implements ShortenUrlUsecase {
  constructor (private readonly expirationTimeInDays: number, private readonly shortener: Shortener) {}

  async shorten (url: string): Promise<ShortenUrlModel> {
    return { original: url, shorten: await this.shortener.shorten(url) }
  }
}
