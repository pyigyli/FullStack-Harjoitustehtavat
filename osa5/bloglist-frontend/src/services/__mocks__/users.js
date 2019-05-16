const users = [
  {
    id: '1',
    name: 'Testhor Testman',
    username: 'testuser'
  },
  {
    id: '2',
    name: 'Jones Smith',
    username: 'mustardboy77'
  }
]

const getAll = () => Promise.resolve(users)

export default {getAll}