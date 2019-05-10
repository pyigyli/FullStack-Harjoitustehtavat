const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)

// password.js is gitignored file
const password = require('./password')
const url = `mongodb+srv://fullstack:${password}@fullstack-puhelinluettelo-aza2d.mongodb.net/test?retryWrites=true`
console.log('connecting to', url)

mongoose.connect(url, {useNewUrlParser: true})
  .then(result => console.log('connected to MongoDB'))
  .catch((error) => console.log('error connecting to MongoDB:', error.message))

const personSchema = new mongoose.Schema({
  name: {type: String, required: true, unique: true},
  number: {type: String, required: true}
})

const  uniqueValidator = require('mongoose-unique-validator')
personSchema.plugin(uniqueValidator)

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)
