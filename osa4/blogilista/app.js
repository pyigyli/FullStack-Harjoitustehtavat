const config = require('./utils/config')
const express = require('express')
const loginRouter = require('./controllers/login')
const usersRouter = require('./controllers/user')
const blogsRouter = require('./controllers/blog')
const middleware = require('./utils/middleware')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()

console.log('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, {useNewUrlParser: true})
  .then(() => console.log('connected to MongoDB'))
  .catch(error => console.log('error connection to MongoDB:', error.message))

app.use(cors())
app.use(bodyParser.json())
app.use(middleware.tokenExtractor)
app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)
app.use('/api/blogs', blogsRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
