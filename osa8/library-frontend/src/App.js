import React, {useState, useEffect} from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommendations from './components/Recommendations'
import {gql} from 'apollo-boost'
import {useQuery, useMutation, useApolloClient} from 'react-apollo-hooks'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const ALL_AUTHORS = gql`
  {
    allAuthors {
      name
      born
      bookCount
    }
  }
  `
  const ALL_BOOKS = gql`
  query allBooks($genre: String, $author: String) {
    allBooks(genre: $genre, author: $author) {
      title
      author {
        name
        born
        bookCount
      }
      published
      genres
    }
  }
  `
  const CREATE_BOOK = gql`
  mutation createBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      published
      author {
        name
        born
        bookCount
      }
      genres
    }
  }
  `
  const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
      bookCount
    }
  }
`
  const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
  `
  const ACCOUNT = gql`
  query {
    account {
      id
      username
      favoriteGenre
    }
  }
  `
  useEffect(() => {
    const token = localStorage.getItem('libraryApp')
    if (token) setToken(token)
  })

  let authors = useQuery(ALL_AUTHORS)
  const addBook = useMutation(CREATE_BOOK, {
    refetchQueries: [{query: ALL_AUTHORS}, {query: ALL_BOOKS}]
  })
  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('login')
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {token && <button onClick={() => setPage('recommendations')}>recommendations</button>}
        {!token && <button onClick={() => setPage('login')}>login</button>}
        {token && <button onClick={() => logout()}>logout</button>}
      </div>
      <Authors
        show={page === 'authors'}
        token={token}
        authors={authors.data.allAuthors}
        ALL_AUTHORS={ALL_AUTHORS}
        edit={useMutation(EDIT_AUTHOR, {
          onError: err => console.log(err),
          refetchQueries: [{query: ALL_AUTHORS}]
        })}
      />
      <Books
        show={page === 'books'}
        token={token}
        ALL_BOOKS={ALL_BOOKS}
      />
      <NewBook
        show={page === 'add'}
        addBook={addBook}
      />
      <LoginForm
        show={page === 'login'}
        onLogin={token => setToken(token)}
        login={useMutation(LOGIN)}
      />
      <Recommendations
        show={page === 'recommendations'}
        ALL_BOOKS={ALL_BOOKS}
        ACCOUNT={ACCOUNT}
      />
    </div>
  )
}

export default App
