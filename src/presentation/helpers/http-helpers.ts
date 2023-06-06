import { type HttpResponse } from '../protocols/http'

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data
})

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})

export const notFound = (): HttpResponse => ({
  statusCode: 404
})

export const redirect = (url: string): HttpResponse => ({
  statusCode: 302,
  location: url,
  body: {}
})
