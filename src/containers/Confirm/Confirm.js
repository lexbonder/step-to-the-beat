import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getPlaylistData } from '../../apiCalls';
import { playlistCleaner } from '../../dataCleaner';
import { savePlaylist, saveRecentSeed } from '../../actions/actions';
import { userContentToFirebase, seedToFirebase } from '../../firebaseCalls';
import PropTypes from 'prop-types';
import './Confirm.css';

export class Confirm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorStatus: '',
      genre: '',
      spm: ''
    };
  }

  componentDidMount = () => {
    const { newSeed, history } = this.props;
    if (newSeed.genre) {
      this.props.saveRecentSeed({...newSeed, id: Date.now()});
      const { genre, spm } = newSeed;
      const capitalized = genre.charAt(0).toUpperCase() + genre.slice(1);
      this.setState({
        genre: capitalized,
        spm
      });
    } else {
      history.push('/saved-playlists');
    }
  }
  
  getPlaylist = async () => {
    const { newSeed,
      accessToken,
      recentSpms,
      recentGenres,
      user,
      recentSeeds,
      history
    } = this.props;
    const { spm, genre } = newSeed;
    try {
      const rawPlaylistData = await getPlaylistData(spm, genre, accessToken);
      const cleanedPlaylist = playlistCleaner(rawPlaylistData.tracks);
      this.props.savePlaylist(cleanedPlaylist);
      recentSeeds.forEach(seed => seedToFirebase(user.id, seed))
      userContentToFirebase(user.id, recentSpms, recentGenres);
      history.push('/playlist');
    } catch (error) {
      this.setState({
        errorStatus: 'Failed to retrieve playlist'
      });
    }
  }

  handleBackButton = () => {
    const { history } = this.props;
    history.push('/select-genre');
  }

  // {spm}
  // { genre.charAt(0).toUpperCase() + genre.slice(1) }
  render() {
    return (
      <div className='Confirm' >
        <h2 className='error'>{this.state.errorStatus}</h2>
        <p>Steps per Minute</p>
        <h2>{this.state.spm}</h2>
        <p>Genre</p>
        <h2>{this.state.genre}</h2>
        <div className='button-wrapper'>
          <button
            onClick={this.handleBackButton}
            className='buttons'>
              Back
          </button>
          <button 
            className='buttons'
            onClick={this.getPlaylist}>
              Get My Playlist!
          </button>
        </div>
      </div>
    );
  }  
}

const { shape, number, string, arrayOf, func } = PropTypes;

Confirm.propTypes = {
  newSeed: shape({
    spm: number,
    genre: string
  }),
  user: shape({
    id: string,
    name: string
  }),
  recentSpms: arrayOf(number),
  recentGenres: arrayOf(string),
  recentSeeds: arrayOf(shape({
    spm: number,
    genre: string
  })),
  accessToken: string,
  savePlaylist: func,
  saveRecentSeed: func,
  history: shape({
    push: func
  })
};

export const MSTP = store => ({
  newSeed: store.newSeed,
  user: store.user,
  recentSpms: store.recentSpms,
  recentGenres: store.recentGenres,
  recentSeeds: store.recentSeeds,
  accessToken: store.accessToken
});

export const MDTP = dispatch => ({
  savePlaylist: playlist => dispatch(savePlaylist(playlist)),
  saveRecentSeed: seed => dispatch(saveRecentSeed(seed))
});

export default withRouter(connect(MSTP, MDTP)(Confirm));