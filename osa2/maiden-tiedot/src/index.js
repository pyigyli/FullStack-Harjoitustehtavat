import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [countryFilter, setCountryFilter] = useState('')
  const [weather, setWeather] = useState({temp: '', icon: '', wind: '', direction: ''})

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then(response => setCountries(response.data))
  }, [])

  let info = 'too many matches, specify another filter'
  const filtered = countries.filter(country => country.name.toLocaleLowerCase().includes(countryFilter.toLocaleLowerCase()))
  if (filtered.length === 1) {
    axios.get(`http://api.apixu.com/v1/current.json?key=b9633dedcb1646f3be8151757190905&q=${filtered[0].capital}`).then(
      response => setWeather({
        temp: response.data.current.temp_c,
        icon: response.data.current.condition.icon,
        wind: response.data.current.wind_kph,
        direction: response.data.current.wind_dir
      })
    )
    info = (
      <div>
        <h2>{filtered[0].name}</h2>
        <p>capital {filtered[0].capital}</p>
        <p>population {filtered[0].population}</p>
        <h3>languages</h3>
        {filtered[0].languages.map((language, index) => <li key={index}>{language.name}</li>)}
        <img src={filtered[0].flag} height={200} alt='flag'/>
        <h3>Weather in {filtered[0].capital}</h3>
        <p>Temperature: {weather.temp} Celsius</p>
        <img src={weather.icon} alt=''/>
        <p>Wind: {weather.wind} kph direction {weather.direction}</p>
      </div>
    )
  } else if (filtered.length <= 10) {
    info = filtered.map((country, index) => (
      <div key={index}>
        <p>{country.name}</p>
        <button onClick={e => setCountryFilter(country.name)}>show</button>
      </div>
    ))
  }
  
  return (
    <div>
      find countries: <input type='text' onChange={e => setCountryFilter(e.target.value)}/>
      <div>
        {info}
      </div>
    </div>
  )
}

ReactDOM.render(<App/>, document.getElementById('root'))