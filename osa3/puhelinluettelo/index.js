const express = require('express')
const app = express()
app.use(express.static('build'))

const bodyParser = require('body-parser')
app.use(bodyParser.json())

const morgan = require('morgan')
morgan.token('person', function (req, res) {return JSON.stringify(req.body)})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :person'))

const cors = require('cors')
app.use(cors())

const mongodb = require('./mongomoduuli')

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '045-1236543'
  },
  {
    id: 2,
    name: 'Arto Järvinen',
    number: '041-21423123'
  },
  {
    id: 3,
    name: 'Lea Kutvonen',
    number: '040-4323234'
  },
  {
    id: 4,
    name: 'Martti Tienari',
    number: '09-784232'
  }
]

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
  mongodb.find({})
    .then(persons => res.json(persons.map(person => person.toJSON())))
    .catch(error => console.log(error.response.data))
})

app.post('/api/persons', (req, res) => {
  const newPerson = req.body
  if (newPerson.name.length < 3) {
    return res.status(400).json({error: 'name must be at least 3 characters long'})
  }
  if (newPerson.number.length < 8) {
    return res.status(400).json({error: 'number must be at least 8 characters long'})
  }
  if (!newPerson || !newPerson.name || !newPerson.number) {
    return res.status(400).json({error: 'both name and number are required'})
  }
  if (persons.filter(person => person.name === newPerson.name).length > 0) {
    return res.status(400).json({error: 'name must be unique'})
  }
  persons = persons.concat(newPerson)
  mongodb.create(newPerson)
    .catch(error => console.log(error.response.data))
})

app.get('/api/persons/:id', (req, res, next) => {
  mongodb.findById(req.params.id).then(person => res.json(person))
    .catch(error => next(error))
})

app.put('/api/persons/:id/update', (req, res, next) => {
  const person = {name: req.body.name, number: req.body.number}
  console.log(req.params.id)
  mongodb.findByIdAndUpdate(req.params.id, person, {new: true})
    .then(updatedPerson => res.json(updatedPerson.toJSON()))
    .catch(error => next(error))
})

app.delete('/api/persons/:id/delete', (req, res, next) => {
  mongodb.findByIdAndRemove(req.params.id)
    .then(result => res.status(204).end())
    .catch(error => next(error))
})

app.get('/info', (req, res) => {
  res.send(`
    <p>Puhelinluettelossa ${persons.length} henkilön tiedot</p>
    <p>${new Date()}</p>
  `)
})

const unknownEndpoint = (req, res) => res.status(404).send({error: 'unknown endpoint'})
app.use(unknownEndpoint)

const errorHandler = (err, req, res, next) => console.log(err)
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})