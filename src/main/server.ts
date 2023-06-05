import { MongoHelper } from '../infra/db/mongo-helper'
import env from './config/env'

MongoHelper.connect(env.mongoUrl).then(async () => {
  const app = (await import ('./config/app')).default
  const port = env.port
  app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
  })
}).catch(console.error)
