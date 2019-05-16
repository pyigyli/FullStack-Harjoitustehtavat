import React, {useState, useEffect} from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import accountService from './services/login'
import userService from './services/users'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({message: '', error: false})
  const [showLoginForm, setShowLoginForm] = useState(false)

  const refreshBlogs = () => {
    blogService.getAll().then(receivedBlogs => {
      userService.getAll().then(users => {
        receivedBlogs.forEach(blog => {
          users.forEach(user => {
            blog.user = blog.user === user.id ? user : blog.user
          })
        })
        setBlogs(receivedBlogs.sort((a, b) => b.likes - a.likes))
      })
    })
  }

  useEffect(() => refreshBlogs(), [])

  useEffect(() => {
    const userJSON = window.localStorage.getItem('bloglistApp')
    if (userJSON) {
      setUser(JSON.parse(userJSON))
    }
  })

  const handleLogin = (username, password) => {
    accountService.login(username, password)
      .then(user => {
        setUser(user)
        window.localStorage.setItem('bloglistApp', JSON.stringify(user))
      })
      .catch(() => showNotification('wrong username or password', true))
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('bloglistApp')
  }

  const createBlog = (title, author, url) => {
    blogService.create(title, author, url)
      .then(() => {
        showNotification(`a new blog ${blogs[blogs.length-1].title} by ${blogs[blogs.length-1].author}`)
        refreshBlogs()
      })
  }

  const updateBlog = blog => blogService.update(blog).then(() => refreshBlogs())

  const deleteBlog = blog => {
    if (window.confirm(`remove blog ${blog.title} by ${blog.author}`)) {
      blogService.remove(blog).then(() => refreshBlogs())
    }
  }

  const showNotification = (message, error=false) => {
    setNotification({message: message, error: error})
    setInterval(() => {
      setNotification({message: '', error: false})
      clearInterval()
    }, 4000)
  }

  return (
    <div>
      {user ?
        <div>
          <h2>blogs</h2>
          <Notification notification={notification}/>
          <p>{user.name} logged in</p>
          <button onClick={() => handleLogout()}>Logout</button>
          <NewBlogForm createBlog={(title, author, url) => createBlog(title, author, url)}/>
          {blogs.map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
              user={user}
              onLikeBlog={obj => updateBlog(obj)}
              onDeleteBlog={obj => deleteBlog(obj)}
            />
          )}
        </div>
        :
        <div>
          {showLoginForm ?
            <div>
              <Notification notification={notification}/>
              <LoginForm onSubmit={(username, password) => handleLogin(username, password)}/>
              <button onClick={() => setShowLoginForm(false)}>Cancel</button>
            </div>
            :
            <button onClick={() => setShowLoginForm(true)}>Login</button>
          }
        </div>
      }
    </div>
  )
}

export default App