const initialState = {message: '', error: false}

const resetNotification = () => {
  return async dispatch => {
    dispatch({type: 'RESET'})
  }
}

const setNotification = (message, error) => {
  return  async dispatch => {
    dispatch({type: 'NOTIFY', data: {message, error}})
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case 'NOTIFY':
    state = {message: action.data.message, error: action.data.error}
    return state
  case 'RESET':
    return initialState
  default: return state
  }
}

export default reducer
export {resetNotification, setNotification}