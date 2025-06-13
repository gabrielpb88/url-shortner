import { MongoClient } from 'mongodb'
import { connectToMongo } from './mongo'

jest.mock('mongodb')

// mock the logger to not polute the tests
jest.mock('logger')

describe('connectToMongo', () => {
  it('should connect to MongoDB and return db and urlsCollection', async () => {
    const mockMongoClientInstance = {
      connect: jest.fn(),
      db: jest.fn().mockReturnValue({
        collection: jest.fn().mockReturnValue({
          find: jest.fn(),
        }),
      }),
    }
    const mockMongoClient = MongoClient as unknown as jest.Mock
    mockMongoClient.mockImplementation(() => mockMongoClientInstance)

    const result = await connectToMongo()

    expect(result.db).toBeDefined()
    expect(result.urlsCollection).toBeDefined()
    expect(result.db.collection).toHaveBeenCalledWith('urls')
  })

  it('should throw error when connection fails', async () => {
    const mongoClientMock = MongoClient as unknown as jest.Mock
    mongoClientMock.mockImplementation(() => ({
      connect: jest.fn().mockRejectedValue(new Error('Connection error')),
    }))

    await expect(connectToMongo()).rejects.toThrow('Connection error')
  })
})
