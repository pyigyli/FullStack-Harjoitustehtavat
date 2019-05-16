import React from 'react'
import PropTypes from 'prop-types'
import {useField} from '../hooks/index'

const NewLoginForm = ({createBlog}) => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const handleSubmit = () => {
    createBlog(title.value, author.value, url.value)
    title.reset()
    author.reset()
    url.reset()
  }

  return (
    <div>
      <h2>create new</h2>
      <div>
        title:
        <input {...{...title, reset: null}}/>
      </div>
      <div>
        author:
        <input {...{...author, reset: null}}/>
      </div>
      <div>
        url:
        <input {...{...url, reset: null}}/>
      </div>
      <button onClick={() => handleSubmit()}>create</button>
    </div>
  )
}

NewLoginForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default NewLoginForm