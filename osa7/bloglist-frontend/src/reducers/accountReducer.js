import accountService from '../services/login'

const getUser = user => {
  return async dispatch => {
    dispatch({type: 'GET', data: user})
  }
}

const login = (username, password) => {
  return async dispatch => {
    const user = await accountService.login(username, password)
    window.localStorage.setItem('bloglistApp', JSON.stringify(user))
    dispatch({type: 'LOGIN', data: user})
  }
}

const logout = () => {
  return async dispatch => {
    window.localStorage.removeItem('bloglistApp')
    dispatch({type: 'LOGOUT'})
  }
}

const reducer = (state = null, action) => {
  switch (action.type) {
  case 'GET':
    return action.data
  case 'LOGIN':
    return action.data
  case 'LOGOUT':
    return null
  default: return state
  }
}

export default reducer
export {getUser, login, logout}