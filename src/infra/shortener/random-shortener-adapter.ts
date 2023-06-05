import { type Shortener } from '../../data/usecases/protocols/shortener'

export class RandomShortenerAdapter implements Shortener {
  async shorten (value: string): Promise<string> {
    const base62Chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    let short = ''
    for (let i = 0; i <= 7; i++) {
      short += base62Chars[Math.round(Math.random() * 62)]
    }
    return short
  }
}
