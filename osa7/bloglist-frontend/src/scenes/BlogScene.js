import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'
import {likeBlog, removeBlog} from '../reducers/blogReducer'
import {setNotification} from '../reducers/notificationReducer'

const BlogScene = props => {
  const blog = props.blogs.find(blog => blog.id === props.id)
  if (blog === undefined) return null

  const like = () => {
    props.likeBlog(blog)
    props.setNotification(`you liked '${blog.title}' by ${blog.author}`, false)
  }

  const deleteBlog = () => {
    if (window.confirm(`remove blog ${blog.title} by ${blog.author}`)) {
      props.removeBlog(blog)
      props.history.push('/')
    }
  }

  return (
    <div>
      <h2 style={{fontFamily: 'arial', color: '#221155'}}>{blog.title} {blog.author}</h2>
      <p style={{fontFamily: 'arial'}}>{blog.url}</p>
      <p style={{fontFamily: 'arial'}}>
        {blog.likes} likes
        <button style={{marginLeft: '5px'}} onClick={() => like()}>like</button>
      </p>
      <p style={{fontFamily: 'arial'}}>added by {blog.user.name}</p>
      {props.user.username === blog.user.username ? <button onClick={() => deleteBlog()}>remove</button> : null}
    </div>
  )
}

BlogScene.propTypes = {
  id: PropTypes.string.isRequired
}

const BlogSceneWithHistory = withRouter(BlogScene)

const mapStateToProps = state => {
  return {
    blogs: state.blogs,
    notification: state.notification,
    user: state.user,
    users: state.users
  }
}

const mapDispatchToProps = {likeBlog, removeBlog, setNotification}

const ConnectedBlogScene = connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogSceneWithHistory)

export default ConnectedBlogScene