import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createNewPlaylist, populatePlaylist } from '../../apiCalls';
import './Playlist.css';

export class Playlist extends Component {
  constructor() {
    super();
    this.state = {
      playlistName: '',
      playlistResponse: '',
      trackUris: []
    };
  }

  playlistToRender = () => {
    const { playlist } = this.props;
    return playlist.map(track => (
      <div
        key={track.id}
        className='track'
        id={track.id}
      >
        {/*<input type='checkbox' className='checkbox' />*/}
        <h4>{track.title}</h4>
        <h4>{track.artist}</h4>
      </div>
    ));
  }

  toggleSelectAll = event => {
    const { checked } = event.target;
    const allCheckboxes = document.querySelectorAll('.checkbox');
    if (checked) {
      allCheckboxes.forEach( checkbox => checkbox.checked = true);
      // this.saveChecked(allCheckboxes)
    } else {
      allCheckboxes.forEach( checkbox => checkbox.checked = false);
    }
  }

  // saveChecked = () => {
  //   const allCheckboxes = document.querySelectorAll('.checkbox');
  //   allCheckboxes.forEach( checkbox => {
  //     if (checkbox.checked) {
  //       this.props.saveTrack() ////////////////////////////////
  //     }
  //   })
  // }

  sendToSpotify = async () => {
    const { user, accessToken } = this.props;
    const { playlistName, trackUris } = this.state;
    const playlistResponse = await 
      createNewPlaylist(user.id, accessToken, playlistName);
    const { response, playlistId } = playlistResponse;

    populatePlaylist(user.id, playlistId, accessToken, trackUris);

    this.setState({playlistResponse: response});
  }

  componentDidMount = () => {
    const { user, newSeed, playlist } = this.props;
    const { spm, genre } = newSeed;
    const playlistName = `${user.name}'s ${spm} SPM, ${genre} playlist`;
    const trackUris = playlist.map( track => track.uri );
    this.setState({playlistName, trackUris});
  }

  changePlaylistName = (event) => {
    const playlistName = event.target.value;
    this.setState({playlistName});
  }

  render() {
  
    return (
      <div>
        <div>
          <h3>{this.state.playlistResponse}</h3>
          <input
            className='summary'
            onChange={this.changePlaylistName}
            value={this.state.playlistName}
          />
          <button onClick={this.sendToSpotify}>Send to Spotify</button>
        </div>
        <div className='playlist'>
          {/*<input
            type='checkbox'
            id='select-all' 
            onClick={this.toggleSelectAll}
          />*/}
          <h3>Title</h3>
          <h3>Artist</h3>
          {this.playlistToRender()}
        </div>
      </div>
    );
  }
}

export const MSTP = store => ({
  playlist: store.playlist,
  newSeed: store.newSeed,
  user: store.user,
  accessToken: store.accessToken
});

export default withRouter(connect(MSTP)(Playlist));