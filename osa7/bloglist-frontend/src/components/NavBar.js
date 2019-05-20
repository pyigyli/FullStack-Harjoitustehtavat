import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../reducers/accountReducer'

const NavBar = props => {
  const navbarStyle = {
    background: '#eebb11',
    width: '100%',
    height: '35px',
    padding: '5px'
  }

  const menuItemStyle = {
    float: 'left',
    margin: '10px',
    fontFamily: 'arial',
    fontWeight: 'bold',
    color: '#221155'
  }

  const handleLogout = () => {
    props.logout()
  }

  return (
    <div style={navbarStyle}>
      <Link style={menuItemStyle} to={'/'}>blogs</Link>
      <Link style={menuItemStyle} to={'/users'}>users</Link>
      <div style={menuItemStyle}>{props.user.name} logged in</div>
      <button style={menuItemStyle} onClick={() => handleLogout()}>Logout</button>
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

const mapDispatchToProps = {logout}

const ConnectedNavBar = connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar)

export default ConnectedNavBar