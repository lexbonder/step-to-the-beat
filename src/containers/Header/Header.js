import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getUserContent } from '../../firebaseCalls';
import {
  logOutUser,
  clearAccessToken,
  saveAccessToken,
  logInUser,
  saveUser,
  seedsFromFirebase,
  genresFromFirebase, 
  spmsFromFirebase
} from '../../actions/actions';
// import { logInUser, saveUser, saveAccessToken }
import PropTypes from 'prop-types';
import './Header.css';

export class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: 'hide'
    };
  }

  componentDidMount = async () => {
    const { 
      loggedIn, 
      saveUser, 
      logInUser, 
      saveAccessToken 
    } = this.props;
    if (!loggedIn && localStorage.currentUser) {
      const retrieved = localStorage.getItem('currentUser')
      const currentUser = JSON.parse(retrieved)
      
      logInUser()
      saveUser(currentUser.user)
      saveAccessToken(currentUser.accessToken)
      
      const userContent = await getUserContent(currentUser.user.id)
      this.reloadUserContent(userContent)
    }
  }

  reloadUserContent = userContent => {
    const { 
      history,
      seedsFromFirebase, 
      genresFromFirebase, 
      spmsFromFirebase 
    } = this.props;
    if (userContent.val()) {
      const { savedGenres, savedSeeds, savedSpms} = userContent.val();
      seedsFromFirebase(savedSeeds);
      genresFromFirebase(savedGenres);
      spmsFromFirebase(savedSpms);
    } 
    history.push('/saved-playlists')
  }

  hideLogOut = () => {
    this.setState({menuOpen: 'hide'})
  }

  showLogOut = () => {
    this.setState({menuOpen: 'show'});
  }

  handleLogOut = () => {
    const {logOutUser, clearAccessToken, history} = this.props;
    logOutUser();
    clearAccessToken();
    localStorage.removeItem('currentUser')
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
    const { user, loggedIn, location, history } = this.props;
    if (loggedIn) {
      return (
        <header>
          <button 
            onClick={this.handleHomeButton}
            className='home-button'
          >
            <i className="fas fa-home"></i>
          </button>
          <h2 className='page-name'>{this.pageName()}</h2>
          <div 
              onMouseEnter={this.showLogOut}
              onMouseLeave={this.hideLogOut}
          className='menu-wrapper'>
            <img
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
  clearAccessToken: () => dispatch(clearAccessToken()),
  logInUser: () => dispatch(logInUser()),
  saveAccessToken: accessToken => dispatch(saveAccessToken(accessToken)),
  saveUser: user => dispatch(saveUser(user)),
  seedsFromFirebase: seeds => dispatch(seedsFromFirebase(seeds)),
  genresFromFirebase: genres => dispatch(genresFromFirebase(genres)),
  spmsFromFirebase: spms => dispatch(spmsFromFirebase(spms))
});

export default withRouter(connect(MSTP, MDTP)(Header));