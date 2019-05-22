import React, {useState} from 'react'

const Authors = props => {
  if (!props.show) return null

  const [selectedAuthor, setSelectedAuthor] = useState('')
  const [year, setYear] = useState(null)
  
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {props.authors && props.authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      {props.token && (
        <div>
          <h3>Set birthyear</h3>
          name
          <select onChange={event => setSelectedAuthor(event.target.value)}>
            {props.authors && props.authors.map(a => {
              return <option key={a.name} value={a.name}>{a.name}</option>
            })}
          </select>
          <div>
            born <input type='number' onChange={({target}) => setYear(target.value)}/>
          </div>
          <button onClick={() => {
            props.edit({variables: {name: selectedAuthor, setBornTo: Number.parseInt(year)}})
          }}>update author</button>
        </div>
      )}
    </div>
  )
}

export default Authors