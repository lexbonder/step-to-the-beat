import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { logOutUser, clearAccessToken } from '../../actions/actions';
import PropTypes from 'prop-types';
import './Header.css';

export class Header extends Component {

  handleLogOut = () => {
    const {logOutUser, clearAccessToken} = this.props;
    logOutUser();
    clearAccessToken();
  }
  
  userGreeting = () => {
    const { user, loggedIn } = this.props;
    if (loggedIn) {
      return (
        <div>
          <p>Welcome, {user.name}!</p>
          <p className='log-out' onClick={this.handleLogOut}>Log Out</p>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <header>
          <Link to='/'>
            <h1>Step to the Beat</h1>
          </Link>
          {this.userGreeting()}
        </header>
      </div>
    );
  }
}

const { bool, shape, string, func } = PropTypes;

Header.propTypes = {
  loggedIn: bool,
  user: shape({
    name: string,
    id: string
  }),
  logOutUser: func,
  clearAccessToken: func
};

export const MSTP = ({ loggedIn, user }) => ({
  loggedIn,
  user
});

export const MDTP = (dispatch) => ({
  logOutUser: () => dispatch(logOutUser()),
  clearAccessToken: () => dispatch(clearAccessToken())
});

export default withRouter(connect(MSTP, MDTP)(Header));