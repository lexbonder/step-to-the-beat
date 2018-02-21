import React, { Component } from 'react';
import { connect } from 'react-redux';
import { authorize } from '../../authorizeSpotify';
import { Link, NavLink, withRouter } from 'react-router-dom';
import './Home.css';

export class Home extends Component {

// If user is not logged in:
  view = () => {
    if (this.props.loggedIn) {
      return (
        <div className='dashboard'>
          <NavLink 
            activeClassName='dashNav'
            to='/saved-spms'>My Saved SPM's</NavLink>
          <NavLink 
            activeClassName='dashNav'
            to='/favorite-songs'>My Favorite Songs</NavLink>
          <NavLink 
            activeClassName='dashNav'
            to='/favorite-playlists'>My Favorite Playlists</NavLink>
          <NavLink 
            activeClassName='dashNav'
            to='/calculations'>Get New SPM</NavLink>
          <NavLink 
            activeClassName='dashNav'
            to='/select-spm'>Get New Playlist</NavLink>
        </div>
      )
    } else {
      return (
        <div className='Home'>
          <p className='intro'>
            Step to the beat figures out your personal rhythm! <br/>
            We'll help you calculate your Steps Per Minute (SPM) and
            we'll give you a personalized playlist with the same Beats 
            Per Minute!
          </p>
          <button className='log-in' onClick={authorize}>Login with Spotify to begin</button>
        </div>
      )
    }
  }

  render() {
    return (
      <div>
        {this.view()}
      </div>
    )
  }
}

export const MSTP = ({loggedIn}) => ({loggedIn})

export default withRouter(connect(MSTP)(Home))