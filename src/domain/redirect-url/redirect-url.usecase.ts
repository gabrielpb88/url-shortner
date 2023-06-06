export interface RedirectUrlUsecase {
  find: (short: string) => Promise<string>
}
