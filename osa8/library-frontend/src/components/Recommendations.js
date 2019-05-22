import React, {useState, useEffect} from 'react'
import {useApolloClient} from 'react-apollo-hooks'

const Recommendations = props => {
  if (!props.show) return null

  const [recommendations, setRecommendations] = useState(null)
  const [genre, setGenre] = useState('')
  const client = useApolloClient()

  useEffect(() => {getBooks()}, [])

  const getBooks = async () => {
    const user = await client.query({query: props.ACCOUNT, fetchPolicy: 'no-cache'})
    setGenre(user.data.account.genre)
    const books = await client.query({query: props.ALL_BOOKS, variables: {genre}, fetchPolicy: 'no-cache'})
    setRecommendations(books.data.allBooks)
  }

  if (!recommendations) return null

  return (
    <div>
      <h2>recommendations</h2>
      <div>
        books in your favorite genre <strong>{genre}</strong>
      </div>
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
          {recommendations && recommendations.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author !== null ? a.author.name : 'no name'}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations