import { type ShortenUrlModel } from '../../../domain/shorten-url/shorten-url.usecase'

export interface FindUrlRepository {
  find: (short: string, expirationDate: Date) => Promise<ShortenUrlModel>
}
