import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {likeBlog, removeBlog} from '../reducers/blogReducer'
import {setNotification} from '../reducers/notificationReducer'

const Blog = props => {
  const blogStyle = {
    width: '500px',
    minWidth: '500px',
    maxWidth: '80%',
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderRadius: '10px',
    borderWidth: 1,
    marginBottom: 5,
    background: '#eecc99'
  }

  const linkStyle = {
    paddingLeft: '7px',
    paddingBottom: '7px',
    fontFamily: 'arial',
    fontWeight: 600,
    display: 'flex',
    flexDirection: 'collumn',
    justifyContent: 'flex-start'
  }

  return (
    <div style={blogStyle}>
      <Link
        to={`/blogs/${props.blog.id}`}
        style={linkStyle}
      >
        {props.blog.title} {props.blog.author}
      </Link>
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

Blog.propTypes = {
  blog: PropTypes.object.isRequired
}

const mapDispatchToProps = {likeBlog, removeBlog, setNotification}

const ConnectedBlog = connect(
  mapStateToProps,
  mapDispatchToProps
)(Blog)

export default ConnectedBlog