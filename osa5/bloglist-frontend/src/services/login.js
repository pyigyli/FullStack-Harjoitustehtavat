import axios from 'axios'
import blogService from './blogs'

const baseUrl = '/api/login'

const login = (username, password) => {
  const request = axios.post(baseUrl, {username, password})
  return request.then(response => {
    blogService.setToken(response.data.token)
    return response.data
  })
}

export default {login}