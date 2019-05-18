import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {initAnecdotes} from './reducers/anecdoteReducer'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'

const App = props => {
  useEffect(() => props.initAnecdotes(),[])

  return (
    <div>
      <h1>Programming anecdotes</h1>
      <Notification />
      <Filter/>
      <AnecdoteForm />
      <AnecdoteList />
    </div>
  )
}

export default connect(null, {initAnecdotes})(App)