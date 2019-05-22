import React, {useState} from 'react'

const LoginForm = props => {
  if (!props.show) return null

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    const result = await props.login({variables: {username, password}})
    props.onLogin(result.data.login.value)
    localStorage.setItem('libraryApp', result.data.login.value)
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <label>
        username
        <input
          type="text"
          value={username}
          onChange={({target}) => setUsername(target.value)}
        />
      </label>
      <br />
      <label>
        password
        <input
          type="password"
          value={password}
          onChange={({target}) => setPassword(target.value)}
        />
      </label>
      <br />
      <button onClick={handleLogin}>login</button>
    </div>
  )
}

export default LoginForm