import { type ShortenUrlModel } from '../../../domain/shorten-url/shorten-url.usecase'
import { type Url } from '../../../domain/models/url'

export interface AddUrlRepository {
  add: (shortenedUrl: Url) => Promise<ShortenUrlModel>
}
