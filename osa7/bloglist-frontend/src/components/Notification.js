import React from 'react'
import {connect} from 'react-redux'
import {resetNotification} from '../reducers/notificationReducer'

const Notification = props => {
  if (!props.notification.message) return null

  setTimeout(() => props.resetNotification(), 5000)

  const notificationStyle = {
    color: props.notification.error ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    margin: 10,
    fontFamily: 'arial'
  }

  return (
    <div style={notificationStyle}>
      {props.notification.message}
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

const mapDispatchToProps = {resetNotification}

const ConnectedNotification = connect(
  mapStateToProps,
  mapDispatchToProps
)(Notification)

export default ConnectedNotification