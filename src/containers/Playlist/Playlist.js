import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  removeFromPlaylist,
  addToFavoriteSongs,
  removeFavoriteSong
} from '../../actions/actions';
import './Playlist.css';
import { sendFavSongsToFirebase } from '../../firebaseCalls.js'

export class Playlist extends Component {

  handleDeleteButton = event => {
    const { id } = event.target.parentElement
    this.props.removeFromPlaylist(id)
  }

  handleFavoriteButton = event => {
    const { id } = event.target.parentElement
    const { playlist, favoriteSongs } = this.props
    const song = playlist.find( song => song.id === id)
    const preExisting = favoriteSongs.find(fav => fav.id === song.id)
    if (preExisting) {
      this.props.removeFavoriteSong(song.id)
    } else {
      this.props.addToFavoriteSongs(song)
    }
  }

  componentDidUpdate = () => {
    const { favoriteSongs, user } = this.props
    sendFavSongsToFirebase(user.id, favoriteSongs)
  }

  playlistToRender = () => {
    const { playlist } = this.props;
    return playlist.map(track => (
      <div
        className='track'
        id={track.id}
      >
        <h4>{track.title}</h4>
        <h4>{track.artist}</h4>
        <p onClick={this.handleFavoriteButton}>&#9733;</p>
        <button onClick={this.handleDeleteButton}>Delete</button>
      </div>
    ))
  }

  render() {
    const {spm, genre} = this.props.seeds
    
    return (
      <div>
        <div>
          <h2 className='summary'>
            {`Your ${spm} SPM, ${genre} playlist`}
          </h2>
          <button>Favorite <span>&#9733;</span></button>
          <button>Send to Spotify</button>
        </div>
        <div className='playlist'>
          <h3>Title</h3>
          <h3>Artist</h3>
          <h3>&#9733;</h3>
          <h3>Delete</h3>
          {this.playlistToRender()}
        </div>
      </div>
    )
  }
}

export const MSTP = store => ({
  playlist: store.playlist,
  favoriteSongs: store.favoriteSongs,
  seeds: store.seeds,
  user: store.user
})

export const MDTP = dispatch => ({
  removeFromPlaylist: id => dispatch(removeFromPlaylist(id)),
  addToFavoriteSongs: song => dispatch(addToFavoriteSongs(song)),
  removeFavoriteSong: id => dispatch(removeFavoriteSong(id))
})

export default withRouter(connect(MSTP, MDTP)(Playlist))