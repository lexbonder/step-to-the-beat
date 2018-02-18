import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

export class Playlist extends Component {

  playlistToRender = () => {
    const { playlist } = this.props;
    return playlist.map(track => (
      <div>
        <h4>{track.title}</h4>
        <h4>{track.artist}</h4>
        <p>&#9733;</p>
        <button>delete</button>
      </div>
    ))
  }

  render() {
    return (
      <div>
        <h3>Title</h3>
        <h3>Artist</h3>
        <h3>Favorite</h3>
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