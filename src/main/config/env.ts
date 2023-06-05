export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/jusfy',
  port: process.env.PORT || 8080,
  expirationTimeInDays: process.env.EXPIRATION_TIME || 365
}
