const jwt = require('jsonwebtoken')
const config = require('../utils/config')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (req, res) => {
  const result = await Blog.find({})
  res.json(result)
})

blogsRouter.post('/', async (req, res) => {
  try {
    const decodedToken = jwt.verify(req.token, config.SECRET)
    if (!req.token || !decodedToken.id) {
      return res.status(401).json({error: 'token missing or invalid'})
    }
    const user = await User.findById(decodedToken.id)
    const blog = new Blog({
      title: req.body.title,
      author: req.body.author,
      url: req.body.url,
      likes: req.body.likes,
      user: user._id
    })
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog.id)
    await user.save()
    res.status(201).json(user)
  } catch (exception) {
    res.status(400).end()
  }
})

blogsRouter.delete('/:id/delete', async (req, res) => {
  try {
    const decodedToken = jwt.verify(req.token, config.SECRET)
    const user = await User.findById(decodedToken.id)
    const blog = await Blog.findById(req.params.id)
    if (!req.token || !decodedToken.id || blog.user.toString() !== user.id) {
      return res.status(401).json({error: 'token missing or invalid'})
    }
    await Blog.findByIdAndRemove(req.params.id)
    res.status(204).end()
  } catch (exception) {
    res.status(400).end()
  }
})

blogsRouter.put('/:id/update', async (req, res) => {
  const result = await Blog.findByIdAndUpdate(req.params.id, {likes: req.body.likes + 1}, {new: true})
  res.status(200).json(result)
})

module.exports = blogsRouter
