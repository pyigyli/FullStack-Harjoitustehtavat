import React from 'react'
import PropTypes from 'prop-types'
import {useField} from '../hooks/index'

const LoginForm = ({onSubmit}) => {
  const username = useField('text')
  const password = useField('password')

  return (
    <div>
      <h2>log in to application</h2>
      <div>
        käyttäjätunnus
        <input
          type={username.type}
          value={username.value}
          name='Username'
          onChange={username.onChange}
        />
      </div>
      <div>
        salasana
        <input
          type={password.type}
          value={password.value}
          name='Password'
          onChange={password.onChange}
        />
      </div>
      <button onClick={() => onSubmit(username.value, password.value)}>kirjaudu</button>
    </div>
  )
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default LoginForm