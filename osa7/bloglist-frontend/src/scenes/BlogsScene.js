import React from 'react'
import {connect} from 'react-redux'
import BlogList from '../components/BlogList'
import NewBlogForm from '../components/NewBlogForm'

const BlogsScene = () => {
  return (
    <div>
      <NewBlogForm/>
      <BlogList/>
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

const ConnectedBlogsScene = connect(
  mapStateToProps
)(BlogsScene)

export default ConnectedBlogsScene