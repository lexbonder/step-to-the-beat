import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { logOutUser, clearAccessToken } from '../../actions/actions';
import PropTypes from 'prop-types';
import './Header.css';

export class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: 'hide'
    };
  }

  toggleMenu = () => {
    this.state.menuOpen === 'show'
      ? this.setState({menuOpen: 'hide'})
      : this.setState({menuOpen: 'show'});
  }

  handleLogOut = () => {
    const {logOutUser, clearAccessToken, history} = this.props;
    logOutUser();
    clearAccessToken();
    history.push('/');
  }

  handleHomeButton = () => {
    const { history } = this.props;
    history.push('/saved-playlists');
  }
  
  pageName = () => {
    const { pathname } = this.props.location;
    switch (pathname) {
    case '/saved-playlists':
      return 'My Playlists';
    case '/select-spm':
      return 'Select SPM';
    case '/calculations':
      return 'Calculate SPM';
    case '/select-genre':
      return 'Select Genre';
    case '/confirm':
      return 'Confirm';
    case '/playlist':
      return 'View Playlist';
    default:
      return '';
    }
  }

  userGreeting = () => {
    const { user, loggedIn, location } = this.props;
    if (loggedIn && location.pathname !== '/login') {
      return (
        <header>
          <button 
            onClick={this.handleHomeButton}
            className='home-button'
          >
            <i className="fas fa-home"></i>
          </button>
          <h2 className='page-name'>{this.pageName()}</h2>
          <div className='menu-wrapper'>
            <img
              onClick={this.toggleMenu}
              className='profile-pic'
              src={user.image}
              alt='profile'
            />
            <div className={`menu ${this.state.menuOpen}`}>
              <p className='log-out' onClick={this.handleLogOut}>Log Out</p>
            </div>
          </div>
        </header>
      );
    }
  }

  render() {
    return (
      <div>
        {this.userGreeting()}
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
  clearAccessToken: func,
  history: shape({
    push: func
  }),
  location: shape({
    pathname: string
  })
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