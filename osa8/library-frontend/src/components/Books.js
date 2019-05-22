import React, {useState, useEffect} from 'react'
import {useApolloClient} from 'react-apollo-hooks'

const Books = props => {
  if (!props.show) return null

  const client = useApolloClient()
  const [books, setBooks] = useState(null)
  const [filter, setFilter] = useState(null)
  const [genreList, setGenreList] = useState(null)

  useEffect(() => {getBooks()}, [filter])

  const getBooks = async () => {
    if (filter) {
      const result = await client.query({query: props.ALL_BOOKS, variables: {genre: filter[0]}, fetchPolicy: 'no-cache'})
      setBooks(result.data.allBooks)
    } else {
      const result = await client.query({query: props.ALL_BOOKS, fetchPolicy: 'no-cache'})
      setBooks(result.data.allBooks)
      setGenreList(getGenres(result.data.allBooks))
    }
  }

  const getGenres = books => {
    const genres = books.map(book => book.genres)
    const uniqueGenres = [...new Set([...genres])]
    return uniqueGenres
  }

  if (!(books && genreList)) return null

  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books && books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author !== null ? a.author.name : 'no name'}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      {props.token && genreList.map((genre, index) => (
        <button key={index} onClick={() => setFilter(genre)}>{genre}</button>
      ))}
      {props.token && <button onClick={() => setFilter(null)}>all genres</button>}
    </div>
  )
}

export default Books