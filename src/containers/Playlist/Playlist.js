import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './Playlist.css';

export class Playlist extends Component {

  playlistToRender = () => {
    const { playlist } = this.props;
    return playlist.map(track => (
      <div className='track'>
        <h4>{track.title}</h4>
        <h4>{track.artist}</h4>
        <p>&#9733;</p>
        <button>delete</button>
      </div>
    ))
  }

  render() {
    return (
      <div className='playlist'>
        <h3>Title</h3>
        <h3>Artist</h3>
        <h3>&#9733;</h3>
        <h3>Delete</h3>
        {this.playlistToRender()}
      </div>
    )
  }
}

export const MSTP = store => ({
  playlist: store.playlist
})

export default withRouter(connect(MSTP)(Playlist))