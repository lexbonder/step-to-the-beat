import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createNewPlaylist, populatePlaylist } from '../../apiCalls';
import PropTypes from 'prop-types';
import './Playlist.css';

export class Playlist extends Component {
  constructor() {
    super();
    this.state = {
      playlistName: '',
      errorStatus: '',
      trackUris: [],
      selectedTracks: []
    };
  }
  
  componentDidMount = () => {
    const { user, newSeed, playlist } = this.props;
    const { spm, genre } = newSeed;
    const trackUris = playlist.map( track => track.uri );
    const playlistName = `${user.name}'s ${spm} SPM, ${genre} playlist`;
    this.setState({ playlistName, trackUris });
  }

  playlistToRender = () => {
    const { playlist } = this.props;
    return playlist.map(track => (
      <div
        key={track.id}
        className='track'
        id={track.id}
      >
        <input
          type='checkbox'
          className='checkbox'
          id={track.uri}
          onChange={this.saveChecked}
        />
        <h4 className='song-title'>{track.title}</h4>
        <h4 className='song-artist'>{track.artist}</h4>
      </div>
    ));
  }

  toggleSelectAll = event => {
    const { checked } = event.target;
    const allCheckboxes = document.querySelectorAll('.checkbox');
    if (checked) {
      allCheckboxes.forEach( checkbox => checkbox.checked = true);
      this.saveChecked()
    } else {
      allCheckboxes.forEach( checkbox => checkbox.checked = false);
      this.saveChecked()
    }
  }

  saveChecked = () => {
    const allCheckboxes = document.querySelectorAll('.checkbox');
    let selectedTracks = []
    allCheckboxes.forEach( checkbox => {
      if (checkbox.checked) {
        selectedTracks.push(checkbox.id)
      }
    })
    this.setState({selectedTracks})
  }

  sendToSpotify = async () => {
    const { user, accessToken } = this.props;
    const { playlistName, trackUris } = this.state;
    try {
      const playlistResponse = await 
        createNewPlaylist(user.id, accessToken, playlistName);
      const { playlistId } = playlistResponse;
      populatePlaylist(user.id, playlistId, accessToken, trackUris);
      const sendButton = document.querySelector('.send');
      sendButton.innerText = 'Playlist Sent!';
      sendButton.setAttribute('disabled', true);
    } catch (error) {
      this.setState({errorStatus: error.message});
    }
  }

  render() {
    return (
      <div>
        <div className='playlist-header'>
          <h2>{this.state.playlistName}</h2>
          <input
            type='checkbox'
            id='select-all' 
            onClick={this.toggleSelectAll}
          />
          <p>Select All</p>
          <h2>{`${this.state.selectedTracks.length} of ${this.state.trackUris.length} selected.`}</h2>
          <button
            className='buttons send'
            onClick={this.sendToSpotify}>
              Send to Spotify
          </button>
        </div>
        <div className='selected-header'>
        </div>
        <div className='playlist'>
          {this.playlistToRender()}
        </div>
      </div>
    );
  }
}

const { arrayOf, shape, string, number } = PropTypes;

Playlist.propTypes = {
  playlist: arrayOf(shape({
    artist: string,
    title: string,
    id: string,
    uri: string
  })),
  newSeed: shape({
    spm: number,
    genre: string
  }),
  user: shape({
    name: string,
    id: string
  }),
  accessToken: string
};

export const MSTP = store => ({
  playlist: store.playlist,
  newSeed: store.newSeed,
  user: store.user,
  accessToken: store.accessToken
});

export default withRouter(connect(MSTP)(Playlist));
// {<input
//             className='summary'
//             onChange={this.changePlaylistName}
//             value={this.state.playlistName}
//           />}
// console.log('updated')
// const { playlist } = this.props;
// const trackUris = playlist.map( track => track.uri );
// console.log(trackUris)
// this.setState({trackUris})

// changePlaylistName = (event) => {
//   const playlistName = event.target.value;
//   this.setState({playlistName});
// }
