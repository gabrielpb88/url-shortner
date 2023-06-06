import { type RedirectUrlUsecase } from '../../../domain/redirect-url/redirect-url.usecase'
import { type FindUrlRepository } from '../protocols/find-url-repository'

export class RedirectUrl implements RedirectUrlUsecase {
  constructor (private readonly findUrlRepository: FindUrlRepository) {}

  async find (short: string): Promise<string> {
    const date = new Date()
    date.setUTCHours(23, 59, 59, 999)
    const shortenedUrl = await this.findUrlRepository.find(short, date)
    return shortenedUrl?.original
  }
}
