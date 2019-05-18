import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const Statistic = (props) => {
  const {text, value, endSymbol} = props;
  return (
    <tr>
      <td>{text}</td>
      <td>{value}{endSymbol}</td>
    </tr>
  )
}

const Statistics = (props) => {
  const {good, neutral, bad} = props;
  return (
    <div>
      <h1>statistiikka</h1>
      {(good + neutral + bad > 0) ? (
        <table>
          <tbody>
            <Statistic
              text='hyvä'
              value={good}
            />
            <Statistic
              text='neutraali'
              value={neutral}
            />
            <Statistic
              text='huono'
              value={bad}
            />
            <Statistic
              text='yhteensä'
              value={good + neutral + bad}
            />
            <Statistic
              text='keskiarvo'
              value={(good - bad) / (good + neutral + bad)}
            />
            <Statistic
              text='positiivisia'
              value={good / (good + neutral + bad) * 100}
              endSymbol='%'
            />
          </tbody>
        </table>
      ) : (
        <p>Ei yhtään palautetta annettu</p>
      )}
    </div>
  )
}

const App = () => {
  const good = () => store.dispatch({type: 'GOOD'})
  const ok = () => store.dispatch({type: 'OK'})
  const bad = () => store.dispatch({type: 'BAD'})
  const zero = () => store.dispatch({type: 'ZERO'})

  return (
    <div>
      <button onClick={good}>hyvä</button> 
      <button onClick={ok}>neutraali</button> 
      <button onClick={bad}>huono</button>
      <button onClick={zero}>nollaa tilastot</button>
      <Statistics
        good={store.getState().good}
        neutral={store.getState().ok}
        bad={store.getState().bad}
      />
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
