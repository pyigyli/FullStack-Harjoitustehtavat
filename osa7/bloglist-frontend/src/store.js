import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import accountReducer from './reducers/accountReducer'
import blogReducer from './reducers/blogReducer'
import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'

const reducer = combineReducers({
  blogs: blogReducer,
  notification: notificationReducer,
  user: accountReducer,
  users: userReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store