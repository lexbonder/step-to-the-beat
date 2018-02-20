import React, { Component } from 'react';
import { FavPlaylist } from '../../components/FavPlaylist/FavPlaylist';
import './FavoritePlaylists.css';

export class FavoritePlaylists extends Component {
  
  favPlaylistsToRender = () => {
    const myArray = [1,2,3] // This will be the array of favorited playlists retrieved from the store
    if (myArray.length) {
      return myArray.map(thing => <FavPlaylist />)
    } else {
      return <h1>You don't have any favorited playlists!</h1>
    }  
  }

  render() {
    return(
      <div className='favPlaylistWrapper'>
      <h2>Nickname</h2>
      <h2>SPM</h2>
      <h2>Pace</h2>
      <h2>Genre</h2>
      {this.favPlaylistsToRender()}
      </div>
    )
  }
}