import React from 'react'
import {render, waitForElement} from 'react-testing-library'
import App from './App'

describe('<App/>', () => {
  it('if no user logged, login is rendered', async () => {
    const component = render(<App/>)
    await waitForElement(() => component.container.querySelector('button'))
    expect(component.container).toHaveTextContent('Login')
  })

  it('if user logged in, blogs are rendered', async () => {
    const user = {
      name: 'Testhor Testman',
      username: 'testuser'
    }
    window.localStorage.setItem('bloglistApp', JSON.stringify(user))
    const component = render(<App/>)
    await waitForElement(() => component.container.querySelector('button'))
    expect(component.container).toHaveTextContent('Testblog and I Testhor Testman')
    expect(component.container).toHaveTextContent('Hamburgers Ronald McDonald')
  })
})