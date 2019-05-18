import React from 'react'
import {connect} from 'react-redux'
import {resetNotification} from '../reducers/notificationReducer'

const Notification = props => {
  if (!props.notification.message) return null

  setTimeout(() => props.resetNotification(), props.notification.showTime)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  return (
    <div style={style}>
      {props.notification.message}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter,
    notification: state.notification
  }
}

const mapDispatchToProps = {resetNotification}

const ConnectedNotification = connect(
  mapStateToProps,
  mapDispatchToProps
)(Notification)

export default ConnectedNotification
