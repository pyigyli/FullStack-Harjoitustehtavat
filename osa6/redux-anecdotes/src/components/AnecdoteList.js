import React from 'react'
import {connect} from 'react-redux'
import {voteAnecdote} from '../reducers/anecdoteReducer'
import {setNotification} from '../reducers/notificationReducer'

const AnecdoteList = props => {
  const vote = anecdote => {
    props.voteAnecdote(anecdote)
    props.setNotification(`you voted '${anecdote.content}'`, 10)
  }

  return (
    <div>
      {props.anecdotesToShow.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote)}>vote</button>
            </div>
          </div>
        )
      }
    </div>
  )
}

const anecdotesToShow = ({anecdotes, filter}) => {
  return anecdotes
    .filter(anecdote => anecdote.content.includes(filter))
    .sort((a, b) => b.votes - a.votes)
}

const mapStateToProps = state => {
  return {anecdotesToShow: anecdotesToShow(state)}
}

const mapDispatchToProps = {voteAnecdote, setNotification}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)

export default ConnectedAnecdoteList