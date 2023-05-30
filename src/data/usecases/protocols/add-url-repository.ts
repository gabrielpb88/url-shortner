import { type ShortenUrlModel } from '../../../domain/shorten-url/shorten-url.usecase'

export interface AddUrlRepository {
  add: (shortenedUrl: ShortenUrlModel) => Promise<ShortenUrlModel>
}
