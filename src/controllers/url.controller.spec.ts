import { type Request, type Response } from 'express'
import { UrlController } from './url.controller'

describe('UrlController', () => {
  let controller: UrlController
  let urlService: { shortenUrl: jest.Mock, getOriginalUrl: jest.Mock }
  let req: Partial<Request>
  let res: Partial<Response>
  let jsonMock: jest.Mock
  let statusMock: jest.Mock
  let redirectMock: jest.Mock

  beforeEach(() => {
    urlService = {
      shortenUrl: jest.fn(),
      getOriginalUrl: jest.fn(),
    }
    controller = new UrlController(urlService as any)

    jsonMock = jest.fn()
    statusMock = jest.fn().mockReturnValue({ json: jsonMock })
    redirectMock = jest.fn()

    res = { status: statusMock, redirect: redirectMock }
  })

  describe('shortenUrl', () => {
    it('should return 400 if url is missing', async () => {
      req = { body: {} }

      await controller.shortenUrl(req as Request, res as Response)

      expect(statusMock).toHaveBeenCalledWith(400)
      expect(jsonMock).toHaveBeenCalledWith({
        error: 'URL is required',
      })
    })

    it('should return 201 with shortUrl', async () => {
      req = { body: { url: 'http://www.any-url.com' } }
      urlService.shortenUrl.mockResolvedValue('validHash')

      await controller.shortenUrl(req as Request, res as Response)

      expect(urlService.shortenUrl).toHaveBeenCalledWith(req.body.url)
      expect(statusMock).toHaveBeenCalledWith(201)
      expect(jsonMock).toHaveBeenCalledWith({ shortUrl: 'validHash' })
    })

    it('should return 500 if an error occurs', async () => {
      req = { body: { url: 'any valid url' } }
      urlService.shortenUrl.mockRejectedValue(new Error('Something went wrong'))

      await controller.shortenUrl(req as Request, res as Response)

      expect(statusMock).toHaveBeenCalledWith(500)
      expect(jsonMock).toHaveBeenCalledWith({ error: expect.any(Error) })
    })
  })

  describe('getOriginalUrl', () => {
    it('should return 400 if shortUrl is missing', async () => {
      req = { params: {} }

      await controller.getOriginalUrl(req as Request, res as Response)

      expect(statusMock).toHaveBeenCalledWith(400)
      expect(jsonMock).toHaveBeenCalledWith({
        error: 'ShortUrl is required',
      })
    })

    it('should redirect if shortUrl is found', async () => {
      req = { params: { shortUrl: 'hashUrl' } }
      urlService.getOriginalUrl.mockResolvedValue('https://www.any-url.com')

      await controller.getOriginalUrl(req as Request, res as Response)

      expect(urlService.getOriginalUrl).toHaveBeenCalledWith('hashUrl')
      expect(res.redirect).toHaveBeenCalledWith('https://www.any-url.com')
    })

    it('should return 404 if shortUrl is not found', async () => {
      req = { params: { shortUrl: 'notfound' } }
      urlService.getOriginalUrl.mockResolvedValue(null)

      await controller.getOriginalUrl(req as Request, res as Response)

      expect(statusMock).toHaveBeenCalledWith(404)
      expect(jsonMock).toHaveBeenCalledWith({ error: 'Short URL not found' })
    })

    it('should return 500 if an error occurs', async () => {
      req = { params: { shortUrl: 'anyHash' } }
      urlService.getOriginalUrl.mockRejectedValue(
        new Error('Something went wrong')
      )

      await controller.getOriginalUrl(req as Request, res as Response)

      expect(statusMock).toHaveBeenCalledWith(500)
      expect(jsonMock).toHaveBeenCalledWith({ error: expect.any(Error) })
    })
  })
})
