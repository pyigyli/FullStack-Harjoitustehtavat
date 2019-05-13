const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('blogs')
  res.json(users.map(u => u.toJSON()))
})

usersRouter.post('/', async (req, res) => {
  try {
    const body = req.body
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)
    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
      blogs: []
    })
    const savedUser = await user.save()
    res.status(201).json(savedUser)
  } catch (exception) {
    res.status(400).end()
  }
})

usersRouter.delete('/:id/delete', async (req, res) => {
  await User.findByIdAndRemove(req.params.id)
  res.status(204).end()
})

module.exports = usersRouter
