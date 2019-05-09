import React, { useState, useEffect } from 'react'
import db from './database'

const FilterForm = (props) => {
  return (
    <div>
      rajaa näytettäviä: <input onChange={e => props.onChange(e.target.value)}/>
    </div>
  )
}

const SubmitForm = (props) => {

  function onSubmit(e) {
    e.preventDefault()
    props.onSubmit()
  }

  return (
    <form>
      <div>
        nimi: <input onChange={e => props.onChangeName(e.target.value)}/>
      </div>
      <div>
        numero: <input onChange={e => props.onChangeNumber(e.target.value)}/>
      </div>
      <div>
        <button type="submit" onClick={e => onSubmit(e)}>lisää</button>
      </div>
    </form>
  )
}

const Person = (props) => {
  return (
    <div key={props.id}>
      {props.name} {props.number}
      <button onClick={() => props.onRemove(props.id, props.name)}>Poista</button>
    </div>
  )
}

const Listing = (props) => {
  const {persons, nameFilter, onRemove} = props

  return (
    <div>
      {persons.filter(person => person.name.toLocaleLowerCase().includes(nameFilter.toLocaleLowerCase()))
        .map(person => (
          <Person
            key={person.name}
            name={person.name}
            number={person.number}
            id={person.id}
            onRemove={onRemove}
          />
        ))}
    </div>
  )
}

const Notification = ({message}) => {
  if (!message.message) {
    return null
  }

  const messageStyle = {
    color: message.error ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  return (
    <div style={messageStyle}>
      {message.message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState({message: '', error: false})

  useEffect(() => {
    db.getAll().then(response => setPersons(response))
  }, [persons])

  const showMessage = (message, error=false) => {
    setErrorMessage({message: message, error: error})
    setInterval(() => {
      setErrorMessage('')
      clearInterval()
    }, 4000)
  }

  const onSubmit = () => {
    if (persons.every(person => person.name !== newName)) {
      const newPerson = {name: newName, number: newNumber}
      db.create(newPerson)
      .then(showMessage(`Lisättiin ${newName}`))
      .catch(error => showMessage(`Henkilön ${newName} luominen ei onnistunut`, true))
    } else if (window.confirm(`${newName} on jo luettelossa, korvataanko vanha numero uudella?`)) {
      db.update(persons.findIndex(person => person.name === newName) + 1, {name: newName, number: newNumber})
      .then(showMessage(`Päivitettiin ${newName}`))
      .catch(error => showMessage(`Henkilöä ${newName} ei löytynyt`, true))
    }
  }

  const onRemove = (id, name) => {
    if (window.confirm(`Poistetaanko ${name}?`)) {
      db.remove(id)
      .then(showMessage(`Poistettiin ${name}`))
      .catch(error => showMessage(`Henkilö ${newName} oli jo poistettu`, true))
    }
  }

  return (
    <div>
      <h1>Puhelinluettelo</h1>
      <Notification message={errorMessage}/>
      <FilterForm onChange={value => setNameFilter(value)}/>
      <h2>Lisää uusi</h2>
      <SubmitForm
        onChangeName={value => setNewName(value)}
        onChangeNumber={value => setNewNumber(value)}
        onSubmit={() => onSubmit()}
      />
      <h2>Numerot</h2>
      <Listing persons={persons} nameFilter={nameFilter} onRemove={onRemove}/>
    </div>
  )

}

export default App