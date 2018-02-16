import React, { Component } from 'react';
import { connect } from 'react-redux';
import { authorize } from '../../authorizeSpotify';
import { Link, withRouter } from 'react-router-dom';
import { logOutUser, clearAccessToken } from '../../actions/actions';
import './Header.css';
import loginButton from '../../images/login-button.png';

export class Header extends Component {

  handleLogOut = () => {
    const {logOutUser, clearAccessToken} = this.props
    logOutUser()
    clearAccessToken()
  }
  
  view = () => {
    if (!this.props.loggedIn) {
      return <img src={loginButton} onClick={authorize} />
    } else {
      return (
        <div>
          <p>Welcome, (UserName)!</p>
          <p className='log-out' onClick={this.handleLogOut}>Log Out</p>
        </div>
      )
    }
  }

  render() {
    return (
      <div>
        <header>
          <Link to='/'>
            <h1>Step to the Beat</h1>
          </Link>
          {this.view()}
        </header>
      </div>
    )
  }
}

export const MSTP = ({ loggedIn }) => ({
  loggedIn
})

export const MDTP = (dispatch) => ({
  logOutUser: () => dispatch(logOutUser()),
  clearAccessToken: () => dispatch(clearAccessToken())
})

export default withRouter(connect(MSTP, MDTP)(Header))