export interface ShortenUrlUsecase {
  shorten: (url: string) => Promise<ShortenUrlModel>
}

export interface ShortenUrlModel {
  original: string
  shortened?: string
  expirationDate?: Date
}
