import React from 'react'
import 'jest-dom/extend-expect'
import {render, fireEvent} from 'react-testing-library'
import Blog from './Blog'

describe('Blog tests', () => {
  test('renders content', () => {
    const user = {
      name: 'Testhor Testman',
      username: 'testuser'
    }
    const blog = {
      title: 'Testblog and I',
      author: 'Testhor Testman',
      url: 'www.testsite.com',
      likes: 1337,
      user: user
    }
    const component = render(
      <Blog
        blog={blog}
        user={user}
        onLikeBlog={jest.fn()}
        onDeleteBlog={jest.fn()}
      />
    )
    expect(component.container).toHaveTextContent('Testblog and I Testhor Testman')
  })

  test('details rendered after clicking element', () => {
    const user = {
      name: 'Testhor Testman',
      username: 'testuser'
    }
    const blog = {
      title: 'Testblog and I',
      author: 'Testhor Testman',
      url: 'www.testsite.com',
      likes: 1337,
      user: user
    }
    const component = render(
      <Blog
        blog={blog}
        user={user}
        onLikeBlog={jest.fn()}
        onDeleteBlog={jest.fn()}
      />
    )
    fireEvent.click(component.container.querySelector('div'))
    expect(component.container).toHaveTextContent('Testblog and I Testhor Testman')
    expect(component.container).toHaveTextContent('www.testsite.com')
    expect(component.container).toHaveTextContent('1337 likes')
    expect(component.container).toHaveTextContent('added by Testhor Testman')
  })
})