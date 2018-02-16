import React, { Component } from 'react';
import { FavSong } from '../../components/FavSong/FavSong';

export class FavoriteSongs extends Component {
  
  favSongsToRender = () => {
    const myArray = [1,2,3] // This will be the array of favorited songs retrieved from the store
    if (myArray.length) {
      return myArray.map(thing => <FavSong />)
    } else {
      return <h1>You don't have any favorited songs!</h1>
    }  
  }

  render() {
    return(
      <div>
      {this.favSongsToRender()}
      </div>
    )
  }
}