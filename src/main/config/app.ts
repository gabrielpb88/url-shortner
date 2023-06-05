import express, { json, Router } from 'express'
import shortRoute from '../routes/shorten.route'

const app = express()
const router = Router()
app.use(json())
shortRoute(router)
app.use(router)

export default app
