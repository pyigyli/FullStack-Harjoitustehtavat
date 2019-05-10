const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)

} else if (process.argv.length === 3) {
  const password = process.argv[2]
  const url = `mongodb+srv://fullstack:${password}@fullstack-puhelinluettelo-aza2d.mongodb.net/test?retryWrites=true`
  mongoose.connect(url, {useNewUrlParser: true})

  const personSchema = new mongoose.Schema({
    name: String,
    number: String
  })
  const Person = mongoose.model('Person', personSchema)

  Person.find({}).then(result => {
    console.log('puhelinluettelo')
    result.forEach(person => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })

} else if (process.argv.length === 4) {
  console.log('name and number needed, only name found')
  process.exit(1)

} else {
  const password = process.argv[2]
  const url = `mongodb+srv://fullstack:${password}@fullstack-puhelinluettelo-aza2d.mongodb.net/test?retryWrites=true`
  mongoose.connect(url, {useNewUrlParser: true})

  const personSchema = new mongoose.Schema({
    name: String,
    number: String
  })
  const Person = mongoose.model('Person', personSchema)

  const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
  })

  person.save().then(response => {
    console.log('person saved!')
    mongoose.connection.close()
  })
}