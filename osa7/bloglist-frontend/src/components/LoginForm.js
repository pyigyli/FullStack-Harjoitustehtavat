import React from 'react'
import {connect} from 'react-redux'
import {useField} from '../hooks/index'
import {login} from '../reducers/accountReducer'
import {setNotification} from '../reducers/notificationReducer'

const LoginForm = props => {
  const username = useField('text')
  const password = useField('password')

  const handleLogin = () => {
    props.login(username.value, password.value)
      .catch(() => props.setNotification('wrong username or password', true))
  }

  return (
    <div style={{marginTop: '10px', marginLeft: '10px'}}>
      <h2 style={{fontFamily: 'arial', color: '#221155'}}>log in to application</h2>
      <div style={{fontFamily: 'arial', color: '#221155'}}>
        käyttäjätunnus
        <input
          type={username.type}
          value={username.value}
          name='Username'
          onChange={username.onChange}
          style={{marginLeft: '5px'}}
        />
      </div>
      <div style={{fontFamily: 'arial', color: '#221155', marginTop: '5px'}}>
        salasana
        <input
          type={password.type}
          value={password.value}
          name='Password'
          onChange={password.onChange}
          style={{marginLeft: '45px'}}
        />
      </div>
      <button style={{marginTop: '10px', marginLeft: '110px'}} onClick={() => handleLogin()}>Login</button>
      <button style={{marginTop: '10px', marginLeft: '9px'}} onClick={() => props.handleClick()}>Cancel</button>
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

const mapDispatchToProps = {login, setNotification}

const ConnectedLoginForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm)

export default ConnectedLoginForm