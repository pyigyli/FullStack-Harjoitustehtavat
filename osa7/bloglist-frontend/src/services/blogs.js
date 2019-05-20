import axios from 'axios'

const baseUrl = '/api/blogs'
let token = null

const setToken = newToken => token = `Bearer ${newToken}`

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = (title, author, url) => {
  const config = {headers: {Authorization: token}}
  const request = axios.post(baseUrl, {title, author, url, likes: 0}, config)
  return request.then(response => response.data)
}

const update = blog => {
  const request = axios.put(`${baseUrl}/${blog.id}/update`, blog)
  return request.then(result => result.data)
}

const like = blog => {
  const request = axios.put(`${baseUrl}/${blog.id}/update`, {...blog, likes: blog.likes+1})
  return request.then(result => result.data)
}

const remove = blog => {
  const config = {headers: {Authorization: token}}
  return axios.delete(`${baseUrl}/${blog.id}/delete`, config)
}

export default {setToken, getAll, create, update, like, remove}