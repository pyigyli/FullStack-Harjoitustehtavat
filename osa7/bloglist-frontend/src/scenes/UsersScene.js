import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getUsers} from '../reducers/userReducer'

const UsersScene = props => {
  useEffect(() => {
    props.getUsers()
  }, [])

  return (
    <div>
      <h2 style={{fontFamily: 'arial', color: '#221155'}}>Users</h2>
      <table>
        <tbody>
          <tr>
            <th style={{
              fontFamily: 'arial',
              fontWeight: 'bold',
              color: '#221155',
              background: '#eaea44',
              padding: '3px'
            }}></th>
            <th style={{
              fontFamily: 'arial',
              fontWeight: 'bold',
              color: '#221155',
              background: '#eaea44',
              padding: '3px'
            }}>blogs created</th>
          </tr>
          {props.users.map(user => (
            <tr key={user.id}>
              <th style={{fontFamily: 'arial', background: '#eaea44', padding: '3px'}}><Link to={`/users/${user.id}`}>{user.name}</Link></th>
              <th style={{fontFamily: 'arial', background: '#eaea44', padding: '3px'}}>{user.blogs.length}</th>
            </tr>
          ))}
        </tbody>
      </table>
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

const mapDispatchToProps = {getUsers}

const ConnectedUsersScene = connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersScene)

export default ConnectedUsersScene