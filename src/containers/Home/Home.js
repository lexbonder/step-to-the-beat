import React, { Component } from 'react';
import { connect } from 'react-redux';
import { authorize } from '../../authorizeSpotify';
import { NavLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Home.css';

export class Home extends Component {

  view = () => {
    const { loggedIn } = this.props;
    if (loggedIn) {
      return (
        <div className='dashboard'>
          <NavLink 
            activeClassName='dashNav'
            to='/favorite-playlists'>My Favorite Playlists</NavLink>
          <NavLink 
            activeClassName='dashNav'
            to='/select-spm'>Get New Playlist</NavLink>
        </div>
      );
    } 
  }

  render() {
    return (
      <div className='Home'>
        <p className='intro'>
          {`Step to the beat figures out your personal rhythm!
          We'll help you calculate your Steps Per Minute (SPM) and
          we'll give you a personalized playlist with the same Beats 
          Per Minute!`}
        </p>
        <button className='log-in' onClick={authorize}>
          Login with Spotify to begin
        </button>
      </div>
    );
  }
}

const { bool } = PropTypes;

Home.propTypes = {
  loggedIn: bool
};

export const MSTP = ({loggedIn}) => ({loggedIn});

export default withRouter(connect(MSTP)(Home));