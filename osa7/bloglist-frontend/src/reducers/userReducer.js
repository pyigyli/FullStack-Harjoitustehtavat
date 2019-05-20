import userService from '../services/users'

const getUsers = () => {
  return  async dispatch => {
    const users = await userService.getAll()
    dispatch({type: 'GETUSERS', data: users})
  }
}

const reducer = (state = [], action) => {
  switch (action.type) {
  case 'GETUSERS':
    return action.data
  default: return state
  }
}

export default reducer
export {getUsers}