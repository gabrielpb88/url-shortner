export interface FindUrlUsecase {
  find: (short: string) => Promise<string>
}
