import React from 'react'
import 'jest-dom/extend-expect'
import {render, fireEvent} from 'react-testing-library'
import SimpleBlog from './SimpleBlog'

describe('Simple blog tests', () => {
  test('renders content', () => {
    const blog = {
      title: 'testblog',
      author: 'testhor',
      likes: 1337
    }
    const component = render(<SimpleBlog blog={blog} onClick={jest.fn()}/>)
    expect(component.container).toHaveTextContent('testblog')
    expect(component.container).toHaveTextContent('testhor')
    expect(component.container).toHaveTextContent('blog has 1337 likes')
  })

  test('clicks button two times', () => {
    const blog = {
      title: 'testblog',
      author: 'testhor',
      likes: 1337
    }
    const mockHandler = jest.fn()
    const component = render(<SimpleBlog blog={blog} onClick={mockHandler}/>)
    const button = component.container.querySelector('button')
    fireEvent.click(button)
    fireEvent.click(button)
    expect(mockHandler.mock.calls.length).toBe(2)
  })
})