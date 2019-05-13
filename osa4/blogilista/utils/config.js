require('dotenv').config()

const password = require('../password')
const PORT = process.env.PORT || 3003
let MONGODB_URI = process.env.MONGODB_URI || `mongodb+srv://fullstack:${password}@fullstack-puhelinluettelo-aza2d.mongodb.net/blogilista?retryWrites=true`
const SECRET = 'token'

if (process.env.NODE_ENV === 'test') {
  MONGODB_URI = process.env.TEST_MONGODB_URI || `mongodb+srv://fullstack:${password}@fullstack-puhelinluettelo-aza2d.mongodb.net/test?retryWrites=true`
}

module.exports = {MONGODB_URI, PORT, SECRET}
