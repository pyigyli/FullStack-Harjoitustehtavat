const {ApolloServer, gql, AuthenticationError, UserInputError} = require('apollo-server')
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
const jwt = require('jsonwebtoken')
const JWT_SECRET = 'token'
mongoose.set('useFindAndModify', false)

console.log('connecting to MongoDB')
mongoose.connect('mongodb+srv://fullstack:fullstack@cluster0-ostce.mongodb.net/graphql?retryWrites=true', {useNewUrlParser: true})
  .then(() => console.log('connected to MongoDB'))
  .catch((error) => console.log('error connecting to MongoDB', error.message))

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author
    genres: [String!]!
    id: ID!
  }
  type Author {
    name: String!
    born: Int
    bookCount: Int!
    id: ID!
  }
  type User {
    username: String!
    favoriteGenre: String
    id: ID!
  }
  type Token {
    value: String!
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    account: User
  }
  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const filter = {}
      if (args.author) {
        const author = await Author.findOne({name: args.author})
        filter.author = author.id
      }
      if (args.genre)
        filter.genres = args.genre
      const books = await Book.find({...filter}).populate('author')
      return books
    },
    allAuthors: () => {return Author.find({})},
    account: (root, args, context) => {return context.currentUser}
  },
  Author: {
    bookCount: async (root, args) => {
      const books = await Book.find({author: root._id})
      return books.length
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser)
        throw new AuthenticationError('not logged in')
      if (!(args.title && args.published && args.author && args.genres))
        throw new UserInputError('fill all fields')
      const result = await Author.findOne({name: args.author})
      if (result) {
        const book = new Book({
          title: args.title,
          author: result._id,
          published: args.published,
          genres: args.genres
        })
        await book.save()
        return Book.findById(book._id).populate('author')
      }
      const newAuthor = new Author({name: args.author})
      await newAuthor.save()
      const book = new Book({
        title: args.title,
        author: newAuthor._id,
        published: args.published,
        genres: args.genres
      })
      await book.save()
      return Book.findById(book._id).populate('author')
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser)
        throw new AuthenticationError('not logged in')
      const author = await Author.findOne({name: args.name})
      if (author === null)
        throw new UserInputError('author not found by name provided')
      author.born = args.setBornTo
      return author.save()
    },
    createUser: async (root, args) => {
      const {username, favoriteGenre} = args
      const userFound = User.find({username: username})
      if (userFound)
        throw new UserInputError('username already taken')
      const newUser = new User({username, favoriteGenre})
      return newUser.save()
    },
    login: async (root, args) => {
      const user = await User.findOne({username: args.username})
      if (!user || args.password !== 'asdf')
        throw new UserInputError('wrong username or password')
      const loginUser = {
        username: user.username,
        id: user._id
      }
      return {value: jwt.sign(loginUser, JWT_SECRET)}
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({req}) => {
    const authorization = req ? req.headers.authorization : null
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(authorization.substring(7), JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return {currentUser}
    }
  }
})

server.listen().then(({url}) => {
  console.log(`Server ready at ${url}`)
})