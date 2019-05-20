const blogs = [
  {
    id: '1',
    title: 'Testblog and I',
    author: 'Testhor Testman',
    url: 'www.testsite.com',
    likes: 1337,
    user: '1'
  },
  {
    id: '2',
    title: 'Hamburgers',
    author: 'Ronald McDonald',
    url: 'www.mcdonalds.com',
    likes: 321,
    user: '2'
  }
]

const getAll = () => Promise.resolve(blogs)

export default {getAll}