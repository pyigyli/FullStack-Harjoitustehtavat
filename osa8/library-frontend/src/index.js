import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {ApolloClient} from 'apollo-client'
import {createHttpLink} from 'apollo-link-http'
import {InMemoryCache} from 'apollo-cache-inmemory'
import {setContext} from 'apollo-link-context'
import {ApolloProvider} from 'react-apollo'
import {ApolloProvider as ApolloHooksProvider} from 'react-apollo-hooks'

const httpLink = createHttpLink({uri: 'http://localhost:4000/graphql'})

const authLink = setContext((_, {headers}) => {
  const token = localStorage.getItem('libraryApp')
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore'
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all'
  }
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <ApolloHooksProvider client={client}>
      <App />
    </ApolloHooksProvider>
  </ApolloProvider>,
  document.getElementById('root')
)