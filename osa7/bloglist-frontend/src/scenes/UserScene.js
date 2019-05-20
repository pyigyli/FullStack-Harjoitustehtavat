import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

const UserScene = props => {
  const user = props.users.find(user => user.id === props.id)
  if (user === undefined) return null

  return (
    <div>
      <h2 style={{fontFamily: 'arial', color: '#221155'}}>{user.name}</h2>
      <h3 style={{fontFamily: 'arial', color: '#221155'}}>added blogs</h3>
      {user.blogs.map(blog => (
        <li key={blog.id} style={{fontFamily: 'arial'}}>{blog.title}</li>
      ))}
    </div>
  )
}

UserScene.propTypes = {
  id: PropTypes.string.isRequired
}

const mapStateToProps = state => {
  return {
    blogs: state.blogs,
    notification: state.notification,
    user: state.user,
    users: state.users
  }
}

const ConnectedUserScene = connect(
  mapStateToProps
)(UserScene)

export default ConnectedUserScene