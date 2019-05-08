import React, { useState } from 'react'
import ReactDOM from 'react-dom'

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
						<Statistic text='hyvä'			value={good}/>
						<Statistic text='neutraali' 	value={neutral}/>
						<Statistic text='huono'			value={bad}/>
						<Statistic text='yhteensä'		value={good + neutral + bad}/>
						<Statistic text='keskiarvo'		value={(good - bad) / (good + neutral + bad)}/>
						<Statistic text='positiivisia'	value={good / (good + neutral + bad) * 100} endSymbol='%'/>
					</tbody>
				</table>
			) : (
				<p>Ei yhtään palautetta annettu</p>
			)}
		</div>
	)
}

const Button = (props) => {
	const {increment, mood, text} = props;
	return (
		<button onClick={() => increment(mood+1)}>{text}</button>
	)
}

const App = () => {
	const [good, setGood] = useState(0)
	const [neutral, setNeutral] = useState(0)
	const [bad, setBad] = useState(0)

	return (
		<div>
			<h1>anna palautetta</h1>
			<Button increment={setGood}		mood={good}		text='Hyvä'/>
			<Button increment={setNeutral}	mood={neutral}	text='Neutraali'/>
			<Button increment={setBad}		mood={bad}		text='Huono'/>
			<Statistics good={good} neutral={neutral} bad={bad}/>
		</div>
	)
}

ReactDOM.render(<App />, 
	document.getElementById('root')
)