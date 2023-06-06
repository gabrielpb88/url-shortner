export interface HttpResponse {
  statusCode: number
  body?: any
  location?: any
}

export interface HttpRequest {
  body?: any
  short?: string
}
