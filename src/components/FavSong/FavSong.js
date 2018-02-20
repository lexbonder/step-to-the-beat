import React from 'react';
import './FavSong.css';

export const FavSong = () => {
  return (
    <div className='song'>
      <div className='title'>
        <img src='#' alt='album cover goes here' />
        <h1>Song Title</h1>
      </div>
      <h2 className='favorite'>&#9733;</h2>
      <h2>Artist Name</h2>
      <h2 className='genre'>Genre</h2>
    </div>
  )
}