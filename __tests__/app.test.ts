import request from 'supertest'
import express from 'express'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { MongoClient } from 'mongodb'
import { UrlService } from '../src/services/url.service'
import { createUrlRoutes } from '../src/routes/url.routes'
import { type Url } from '../src/interfaces/url.interface'

let app: express.Express
let mongoServer: MongoMemoryServer
let connection: MongoClient

beforeAll(async () => {
  // Start in-memory MongoDB
  mongoServer = await MongoMemoryServer.create()
  const uri = mongoServer.getUri()

  connection = await MongoClient.connect(uri)
  const db = connection.db('in-memory-db')
  const urlsCollection = db.collection<Url>('urls')

  const urlService = new UrlService(urlsCollection)

  app = express()
  app.use(express.json())
  app.use('/', createUrlRoutes(urlService))
})

afterAll(async () => {
  if (connection) await connection.close()
  if (mongoServer) await mongoServer.stop()
})

describe('POST /', () => {
  it('should return 201 and a shortUrl', async () => {
    const res = await request(app)
      .post('/')
      .send({ url: 'https://www.google.com' })
    expect(res.status).toBe(201)
    expect(res.body.shortUrl).toBeDefined()
    expect(typeof res.body.shortUrl).toBe('string')
  })

  it('should return 400 if url is missing', async () => {
    const res = await request(app).post('/').send({})
    expect(res.status).toBe(400)
    expect(res.body.error).toBe('URL is required')
  })
})

describe('GET /:shortUrl', () => {
  it('should redirect to the original URL if shortUrl exists', async () => {
    const postResponse = await request(app)
      .post('/')
      .send({ url: 'https://www.google.com' })
    const { shortUrl } = postResponse.body

    const getResponse = await request(app)
      .get(`/${String(shortUrl)}`)
      .redirects(0)
    expect(getResponse.status).toBe(302)
    expect(getResponse.header.location).toBe('https://www.google.com')
  })

  it('should return 404 if shortUrl does not exist', async () => {
    const res = await request(app).get('/nonexistent')
    expect(res.status).toBe(404)
    expect(res.body.error).toBe('Short URL not found')
  })
})
