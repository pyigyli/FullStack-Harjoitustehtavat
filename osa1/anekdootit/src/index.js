import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {points: new Array(6).fill(0), selected: 0}
  }

  select = () => this.setState({selected: Math.floor(Math.random()*6)})

  vote = () => {
    const copy = this.state.points
    copy[this.state.selected]++
    this.setState({points: copy})
  }
  
  render = () => {
    const {points, selected} = this.state

    let mostVoted = 0;
    points.forEach((amount, index) => mostVoted = amount > points[mostVoted] ? index : mostVoted)

    return (
      <div>
        <h1>Anecdote of the day</h1>
        <p>{this.props.anecdotes[selected]}</p>
        <p>has {points[selected]} votes</p>
        <button onClick={() => this.vote()}>vote</button>
        <button onClick={() => this.select()}>next anecdote</button>
        <h1>Anecdote with most votes</h1>
        <p>{this.props.anecdotes[mostVoted]}</p>
        <p>has {points[mostVoted]} votes</p>
      </div>
    )
  }
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]
const points = new Array(6).fill(0)

ReactDOM.render(
  <App anecdotes={anecdotes} points={points}/>,
  document.getElementById('root')
)