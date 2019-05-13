const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

test('adding a new user works correctly', async () => {
  const user = {
    username: 'Demis',
    name: 'Dimitri Demokäyttäjä',
    password: 'salasana'
  }
  let res = await api.get('/api/users')
  const lengthBeforePost = res.body.length;
  await api.post('/api/users').send(user).expect(201)
  res = await api.get('/api/users')
  expect(res.body.length === lengthBeforePost + 1)
  expect(res.body[lengthBeforePost].username).toEqual('Demis')
  expect(res.body[lengthBeforePost].name).toEqual('Dimitri Demokäyttäjä')
})

test('user not created when name not unique and returns status 400', async () => {
  const user = {
    username: 'Demis',
    name: 'Dimitri Demokäyttäjä',
    password: 'salasana'
  }
  let res = await api.get('/api/users')
  const lengthBeforePost = res.body.length;
  await api.post('/api/users').send(user).expect(400)
  res = await api.get('/api/users')
  expect(res.body.length === lengthBeforePost)
})

test('user not created when name less than 3 long and returns status 400', async () => {
  const user = {
    username: 'Da',
    name: 'Danny Duck',
    password: 'salasana'
  }
  let res = await api.get('/api/users')
  const lengthBeforePost = res.body.length;
  await api.post('/api/users').send(user).expect(400)
  res = await api.get('/api/users')
  expect(res.body.length).toEqual(lengthBeforePost)
})

test('user can be deleted', async () => {
  const res = await api.get('/api/users')
  await api.delete(`/api/users/${res.body[0].id}/delete`)
})

afterAll(() => mongoose.connection.close())
