import React from 'react'
import {connect} from 'react-redux'
import {useField} from '../hooks/index'
import {createBlog} from '../reducers/blogReducer'

const NewBlogForm = props => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const handleSubmit = () => {
    props.createBlog(title.value, author.value, url.value)
    title.reset()
    author.reset()
    url.reset()
  }

  return (
    <div>
      <h2 style={{fontFamily: 'arial', color: '#221155'}}>create new</h2>
      <div style={{fontFamily: 'arial', marginTop: '10px'}}>
        title:
        <input style={{marginLeft: '26px'}} {...{...title, reset: null}}/>
      </div>
      <div style={{fontFamily: 'arial', marginTop: '10px'}}>
        author:
        <input style={{marginLeft: '5px'}} {...{...author, reset: null}}/>
      </div>
      <div style={{fontFamily: 'arial', marginTop: '10px'}}>
        url:
        <input style={{marginLeft: '33px'}} {...{...url, reset: null}}/>
      </div>
      <button style={{
        fontFamily: 'arial',
        marginTop: '10px',
        marginBottom: '20px',
        marginLeft: '55px'
      }} onClick={() => handleSubmit()}>create</button>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    blogs: state.blogs,
    notification: state.notification,
    user: state.user,
    users: state.users
  }
}

const mapDispatchToProps = {createBlog}

const ConnectedNewBlogForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewBlogForm)

export default ConnectedNewBlogForm