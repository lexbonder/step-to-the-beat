import React, { Component } from 'react';
import { FavSong } from '../../components/FavSong/FavSong';
import './FavoriteSongs.css';

export class FavoriteSongs extends Component {
  
  favSongsToRender = () => {
    const myArray = [1,2,3,4,5,6,7,8,] // This will be the array of favorited songs retrieved from the store
    if (myArray.length) {
      return myArray.map(thing => <FavSong />)
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