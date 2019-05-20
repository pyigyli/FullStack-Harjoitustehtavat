import 'jest-dom/extend-expect'
import 'react-testing-library/cleanup-after-each'

jest.mock('./services/blogs')
jest.mock('./services/users')

let savedItems = {}
const localStorageMock = {
  setItem: (key, item) => savedItems[key] = item,
  getItem: key => savedItems[key],
  removeItem: key => delete savedItems[key],
  clear: savedItems = {}
}
window.localStorage = localStorageMock