import React, {useState} from 'react'
import {connect} from 'react-redux'
import {createAnecdote} from '../reducers/anecdoteReducer'
import {setNotification} from '../reducers/notificationReducer'

const AnecdoteForm = props => {
  const [inputField, setInputField] = useState('')

  const addAnecdote = () => {
    if (inputField.length > 0) {
      props.createAnecdote(inputField)
      props.setNotification(`anecdote '${inputField}' created`, 10)
      setInputField('')
    }
  }
  
  return (
    <div>
      <div>
        <input
          type='text'
          value={inputField}
          onChange={event => setInputField(event.target.value)}
        />
      </div>
      <button onClick={() => addAnecdote()}>create</button>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter,
    notification: state.notification
  }
}

const mapDispatchToProps = {createAnecdote, setNotification}

const ConnectedAnecdoteForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteForm)

export default ConnectedAnecdoteForm