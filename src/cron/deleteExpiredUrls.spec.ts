import cron from 'node-cron'
import { deleteUrlsJob } from './deleteExpiredUrls'
import { type UrlService } from '../urlService'

jest.mock('node-cron')

describe('deleteUrlsJob', () => {
  it('schedule cron job as expected', async () => {
    const scheduleMock = jest.fn()
    ;(cron.schedule as jest.Mock).mockImplementation(scheduleMock)

    const fakeService = {
      deleteExpiredUrls: jest.fn().mockResolvedValue(undefined),
    } as unknown as UrlService

    await deleteUrlsJob(fakeService)

    expect(scheduleMock).toHaveBeenCalledWith('0 0 * * *', expect.any(Function))
  })

  it('execute deleteExpiredUrls when cron dispatch', async () => {
    let callbackFn: () => Promise<void> = async () => {}
    ;(cron.schedule as jest.Mock).mockImplementation((_, fn) => {
      callbackFn = fn
    })

    const deleteExpiredUrls = jest.fn().mockResolvedValue(undefined)
    const fakeService = { deleteExpiredUrls } as unknown as UrlService

    await deleteUrlsJob(fakeService)

    await callbackFn()

    expect(deleteExpiredUrls).toHaveBeenCalled()
  })
})
