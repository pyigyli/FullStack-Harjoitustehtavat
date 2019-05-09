import axios from 'axios'

const database = 'http://localhost:3001/persons'

const getAll = () => {
  const request = axios.get(database)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(database, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${database}/${id}`, newObject)
  return request.then(response => response.data)
}

const remove = (id) => {
  const request = axios.delete(`${database}/${id}`)
  return request.then(response => response.data)
}

export default {getAll, create, update, remove}
