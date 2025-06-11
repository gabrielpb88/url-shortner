import { type Collection } from 'mongodb'
import { UrlService } from './url.service'
import { type Url } from '../interfaces/url.interface'

describe('getOriginalUrl', () => {
  let collectionMock: jest.Mocked<Collection<Url>>
  let service: UrlService

  it('should return the original URL when shortUrl is found', async () => {
    collectionMock = {
      findOne: jest.fn(),
    } as unknown as jest.Mocked<Collection<Url>>

    service = new UrlService(collectionMock)

    const mockShortUrl = 'any-url'
    const mockOriginalUrl = 'https://example.com'
    collectionMock.findOne.mockResolvedValue({
      shortUrl: mockShortUrl,
      original: mockOriginalUrl,
    } as unknown as Url)

    const result = await service.getOriginalUrl(mockShortUrl)

    expect(collectionMock.findOne).toHaveBeenCalledWith({
      shortUrl: mockShortUrl,
    })
    expect(result).toBe(mockOriginalUrl)
  })

  it('should return null when shortUrl is not found', async () => {
    const mockShortUrl = 'not-found-short-url'
    collectionMock.findOne.mockResolvedValue(null)

    const result = await service.getOriginalUrl(mockShortUrl)

    expect(collectionMock.findOne).toHaveBeenCalledWith({
      shortUrl: mockShortUrl,
    })
    expect(result).toBeUndefined()
  })

  it('should throw an error if collection.findOne fails', async () => {
    const mockShortUrl = 'any short url'
    const error = new Error('Database failure')
    collectionMock.findOne.mockRejectedValue(error)

    await expect(service.getOriginalUrl(mockShortUrl)).rejects.toThrow(
      'Database failure'
    )
  })
})
