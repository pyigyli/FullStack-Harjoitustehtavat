import React from 'react'
import {connect} from 'react-redux'
import Blog from './Blog'

const BlogList = props => {
  return (
    <div>
      {props.blogs.map(blog => <Blog key={blog.id} blog={blog}/>)}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    blogs: state.blogs.sort((a, b) => b.likes - a.likes),
    notification: state.notification,
    user: state.user,
    users: state.users
  }
}

const ConnectedBlogList = connect(
  mapStateToProps,
)(BlogList)

export default ConnectedBlogList