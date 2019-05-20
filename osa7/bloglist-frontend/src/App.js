import React, {useState, useEffect} from 'react'
import {BrowserRouter, Route} from 'react-router-dom'
import {connect} from 'react-redux'
import LoginForm from './components/LoginForm'
import NavBar from './components/NavBar'
import Notification from './components/Notification'
import BlogsScene from './scenes/BlogsScene'
import BlogScene from './scenes/BlogScene'
import UserScene from './scenes/UserScene'
import UsersScene from './scenes/UsersScene'
import {getUser} from './reducers/accountReducer'
import {getBlogs} from './reducers/blogReducer'
import {getUsers} from './reducers/userReducer'

const App = props => {
  const contentStyle = {
    paddingLeft: '10px'
  }

  const [showLoginForm, setShowLoginForm] = useState(false)

  useEffect(() => {
    const userJSON = window.localStorage.getItem('bloglistApp')
    if (userJSON) {
      props.getUser(JSON.parse(userJSON))
    }
    props.getBlogs()
    props.getUsers()
  }, [])

  return (
    <div>
      {props.user ?
        <BrowserRouter>
          <NavBar/>
          <div style={contentStyle}>
            <Notification/>
            <h2 style={{fontFamily: 'arial', color: '#221155'}}>Blog App</h2>
            <Route exact path='/' render={() => <BlogsScene/>}/>
            <Route exact path='/blogs/:id' render={({match}) => <BlogScene id={match.params.id}/>}/>
            <Route exact path='/users' render={() => <UsersScene/>}/>
            <Route exact path='/users/:id' render={({match}) => <UserScene id={match.params.id}/>}/>
          </div>
        </BrowserRouter>
        :
        <div>
          {showLoginForm ?
            <div>
              <Notification/>
              <LoginForm handleClick={() => setShowLoginForm(false)}/>
            </div>
            :
            <button style={{margin: '20px'}} onClick={() => setShowLoginForm(true)}>Login</button>
          }
        </div>
      }
    </div>
  )
}

const mapStateToProps = state => {
  return {
    blogs: state.blogs,
    notification: state.notification,
    user: state.user,
    users: state.users
  }
}

const mapDispatchToProps = {getBlogs, getUser, getUsers}

const ConnectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default ConnectedApp