import { RandomShortenerAdapter } from './random-shortener-adapter'

describe('Crypto Adapter', () => {
  test('Should return a short url on success', async () => {
    const sut = new RandomShortenerAdapter()
    const short = await sut.shorten('any_url')
    expect(short).toBeTruthy()
  })
})
