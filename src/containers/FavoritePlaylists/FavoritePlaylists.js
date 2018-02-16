import React, { Component } from 'react';
import { FavPlaylist } from '../../components/FavPlaylist/FavPlaylist';

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
      <div>
      {this.favPlaylistsToRender()}
      </div>
    )
  }
}