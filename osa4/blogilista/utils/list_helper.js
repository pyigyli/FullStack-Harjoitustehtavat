const dummy = blogs => 1

const totalLikes = blogs => {
  var likes = 0;
  var res = blogs.reduce((sum, blog) => sum + blog.likes, likes)
  return res
}

const favoriteBlog = blogs => {
  if (blogs.length === 0) return {}
  return blogs.reduce((current, next) => current.likes > next.likes ? current : next)
}

const mostBlogs = blogs => {
  if (blogs.length === 0) return {}
  blogs.sort((a, b) => a.author.localeCompare(b.author))
  let authors = [{author: blogs[0].author, blogs: 1}]
  index = 1
  while (index < blogs.length) {
    if (blogs[index - 1].author !== blogs[index].author) {
      authors.push({author: blogs[index].author, blogs: 1})
    } else {
      const newEntry = authors.find(entry => entry.author === blogs[index].author)
      authors[authors.findIndex(entry => entry.author === blogs[index].author)] = {
        author: newEntry.author,
        blogs: newEntry.blogs + 1
      }
    }
    index++
  }
  return authors.reduce((current, next) => current.blogs > next.blogs ? current : next)
}

const mostLikes = blogs => {
  if (blogs.length === 0) return {}
  blogs.sort((a, b) => a.author.localeCompare(b.author))
  let authors = [{author: blogs[0].author, likes: blogs[0].likes}]
  index = 1
  while (index < blogs.length) {
    if (blogs[index - 1].author !== blogs[index].author) {
      authors.push({author: blogs[index].author, likes: blogs[index].likes})
    } else {
      const newEntry = authors.find(entry => entry.author === blogs[index].author)
      authors[authors.findIndex(entry => entry.author === blogs[index].author)] = {
        author: newEntry.author,
        likes: newEntry.likes + blogs[index].likes
      }
    }
    index++
  }
  return authors.reduce((current, next) => current.likes > next.likes ? current : next)
}

module.exports = {dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes}