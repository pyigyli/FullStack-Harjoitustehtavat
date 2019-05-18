const initialState = {message: '', showTime: 0}

const resetNotification = () => {
  return {type: 'RESET'}
}

const setNotification = (message, showTime) => {
  return  async dispatch => {
    showTime = showTime * 1000
    dispatch({type: 'NOTIFY', data: {message, showTime}})
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NOTIFY':
      state = {message: action.data.message, showTime: action.data.showTime}
      return state
    case 'RESET':
      return initialState
    default: return state
  }
}

export default reducer
export {resetNotification, setNotification}