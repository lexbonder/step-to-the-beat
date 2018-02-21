import React, { Component } from 'react';
import { FavSong } from '../../components/FavSong/FavSong';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './FavoriteSongs.css';

export class FavoriteSongs extends Component {
  
  favSongsToRender = () => {
    const { favoriteSongs } = this.props
    if (favoriteSongs.length) {
      return favoriteSongs.map(song => <FavSong song={song} />)
    } else {
      return <h1>You don't have any favorited songs!</h1>
    }  
  }

  render() {
    return(
      <div className='favSongWrapper'>
      {this.favSongsToRender()}
      </div>
    )
  }
}

export const MSTP = store => ({
  favoriteSongs: store.favoriteSongs
})

export default withRouter(connect(MSTP)(FavoriteSongs))