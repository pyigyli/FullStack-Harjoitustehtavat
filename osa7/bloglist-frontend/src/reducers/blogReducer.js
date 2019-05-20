import blogService from '../services/blogs'
import userService from '../services/users'

const likeBlog = blog => {
  return async dispatch => {
    const newBlog = await blogService.like(blog)
    dispatch({type: 'LIKE', data: newBlog.id})
  }
}

const createBlog = (title, author, url) => {
  return async dispatch => {
    await blogService.create(title, author, url)
    const blogs = await blogService.getAll()
    const users = await userService.getAll()
    blogs.forEach(blog => {
      users.forEach(user => {
        blog.user = blog.user === user.id ? user : blog.user
      })
    })
    dispatch({type: 'CREATE', data: blogs})
  }
}

const getBlogs = () => {
  return  async dispatch => {
    const blogs = await blogService.getAll()
    const users = await userService.getAll()
    blogs.forEach(blog => {
      users.forEach(user => {
        blog.user = blog.user === user.id ? user : blog.user
      })
    })
    dispatch({type: 'GETBLOGS', data: blogs})
  }
}

const removeBlog = object => {
  return async dispatch => {
    await blogService.remove(object)
    const users = await userService.getAll()
    const blogs = await blogService.getAll()
    blogs.forEach(blog => {
      users.forEach(user => {
        blog.user = blog.user === user.id ? user : blog.user
      })
    })
    dispatch({type: 'REMOVE', data: blogs})
  }
}

const reducer = (state = [], action) => {
  switch (action.type) {
  case 'REMOVE':
    return action.data
  case 'LIKE':
    return state.map(blog => {
      return action.data === blog.id ? {...blog, likes: blog.likes+1} : blog
    })
  case 'CREATE':
    return action.data
  case 'GETBLOGS':
    return action.data
  default: return state
  }
}

export default reducer
export {getBlogs, createBlog, likeBlog, removeBlog}