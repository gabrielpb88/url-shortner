export interface Shortener {
  shorten: (value: string) => Promise<string>
}
