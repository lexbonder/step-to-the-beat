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
        <h1 className='title'>
          Step <span className='small-words'>
              to the
            </span> Beat
        </h1>
        <p className='intro'>
          <span className='app-name'>Step to the Beat</span> finds music that fits your personal rhythm!
          <br />
          <br />
          We'll help you calculate your
          <br/>
            <strong>
              Steps Per Minute
            </strong>
          <br/>
          and give you a playlist that runs to your beat.
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