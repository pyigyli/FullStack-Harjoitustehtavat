const initialState = ''

const changeFilter = value => {
  return {type: 'CHANGE', data: value}
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE':
      state = action.data
      return state
    default: return state
  }
}

export default reducer
export {changeFilter}