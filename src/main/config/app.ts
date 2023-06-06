import express, { json, Router } from 'express'
import shortRoute from '../routes/shorten.route'
import redirectRoute from '../routes/redirect.route'

const app = express()
const router = Router()
app.use(json())
shortRoute(router)
redirectRoute(router)
app.use(router)

export default app
