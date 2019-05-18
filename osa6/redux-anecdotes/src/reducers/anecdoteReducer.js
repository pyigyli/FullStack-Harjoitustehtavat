import anecdoteService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = anecdote => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const voteAnecdote = anecdote => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.vote(anecdote)
    dispatch({type: 'VOTE', data: newAnecdote.id})
  }
}

const createAnecdote = content => {
  const object = asObject(content)
  anecdoteService.post(object)
  return {type: 'CREATE', data: object}
}

const initAnecdotes = () => {
  return  async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({type: 'INIT', data: anecdotes})
  }
}

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      return state.map(anecdote => {
        return action.data === anecdote.id ? {...anecdote, votes: anecdote.votes+1} : anecdote
      })
    case 'CREATE':
      return [...state, action.data]
    case 'INIT':
      return action.data
    default: return state
  }
}

export default reducer
export {createAnecdote, voteAnecdote, initAnecdotes}