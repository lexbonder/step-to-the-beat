import React from 'react';
import './FavSong.css';

export const FavSong = ({song}) => {
  const { artist, title, albumCover } = song
  return (
    <div className='song'>
      <div className='title'>
        <img src={albumCover} alt='album cover goes here' />
        <h1>{title}</h1>
      </div>
      <h2 className='favorite'>&#9733;</h2>
      <h2>{artist}</h2>
    </div>
  )
}