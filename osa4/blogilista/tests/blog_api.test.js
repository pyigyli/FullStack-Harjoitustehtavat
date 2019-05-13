const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

let authorization
beforeAll(async () => {
  const user = {
    username: 'Testimies',
    name: 'Teppo Metsola',
    password: 'salasana'
  }
  await api.post('/api/users').send(user)
  const result = await api.post('/api/login').send(user)
  authorization = `Bearer ${result.body.token}`
})

test('adding new blogs works correctly', async () => {
  let res = await api.get('/api/users')
  const blog = {
    title: 'test-title',
    author: 'test-author',
    url: 'www.test-url.com',
    likes: 404,
    userId: res.body[0].id
  }
  res = await api.get('/api/blogs')
  const lengthBeforePost = res.body.length
  await api.post('/api/blogs').send(blog).set('authorization', authorization).expect(201)
  res = await api.get('/api/blogs')
  expect(res.body.length).toEqual(lengthBeforePost + 1)
  expect(res.body[lengthBeforePost].title).toEqual('test-title')
  expect(res.body[lengthBeforePost].author).toEqual('test-author')
  expect(res.body[lengthBeforePost].url).toEqual('www.test-url.com')
  expect(res.body[lengthBeforePost].likes).toEqual(404)
})

test('blogs are returned as json', async () => {
  await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)
})
  
test('blogs have id field, not _id', async () => {
  const res = await api.get('/api/blogs')
  if (res.body.length > 0) {
    expect(res.body[0].id).toBeDefined()
  }
})

test('blog without likes is not added', async () => {
  let res = await api.get('/api/users')
  const blog = {
    title: 'test-title',
    author: 'test-author',
    url: 'www.test-url.com',
    userId: res.body[0].id
  }
  res = await api.get('/api/blogs')
  const lengthBeforePost = res.body.length;
  await api.post('/api/blogs').set('authorization', authorization).send(blog)
  res = await api.get('/api/blogs')
  expect(res.body.length).toEqual(lengthBeforePost)
})

test('blog without title and url returns status 400', async () => {
  let res = await api.get('/api/users')
  const blog = {
    author: 'test-author',
    likes: 404,
    userId: res.body[0].id
  }
  res = await api.get('/api/blogs')
  const lengthBeforePost = res.body.length;
  await api.post('/api/blogs').set('authorization', authorization).send(blog).expect(400)
  res = await api.get('/api/blogs')
  expect(res.body.length).toEqual(lengthBeforePost)
})

test('update blog', async () => {
  const  res = await api.get('/api/blogs')
  const likes = {likes: res.body[0].likes + 1}
  await api.put(`/api/blogs/${res.body[0].id}/update`).send(likes).expect(200)
  expect(res.body[0].likes).toEqual(likes.likes - 1)
})

test('dont delete a blog with incorrect user', async () => {
  const user = {
    username: 'Testimies 2',
    name: 'Tahvo Metsola',
    password: 'salasana'
  }
  await api.post('/api/users').send(user)
  const result = await api.post('/api/login').send(user)
  const wrongAuthorization = `Bearer ${result.body.token}`
  let res = await api.get('/api/blogs')
  const lengthBeforePost = res.body.length;
  await api.delete(`/api/blogs/${res.body[0].id}/delete`).set('authorization', wrongAuthorization).expect(401)
  res = await api.get('/api/blogs')
  expect(res.body.length).toEqual(lengthBeforePost)
})

test('delete a blog with correct user', async () => {
  let res = await api.get('/api/blogs')
  const lengthBeforePost = res.body.length;
  await api.delete(`/api/blogs/${res.body[0].id}/delete`).set('authorization', authorization).expect(204)
  res = await api.get('/api/blogs')
  expect(res.body.length).toEqual(lengthBeforePost - 1)
})

afterAll(async () => {
  const res = await api.get('/api/users')
  await api.delete(`/api/users/${res.body[0].id}/delete`)
  await api.delete(`/api/users/${res.body[1].id}/delete`)
  mongoose.connection.close()
})
