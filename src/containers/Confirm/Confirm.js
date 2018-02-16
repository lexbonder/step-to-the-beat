import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Confirm extends Component {
  
  render() {
    return (
      <div>
        <h2>Confirm</h2>
        <h2>Set SPM</h2>
        <h2>Set Genre</h2>
        <Link to={`/select-genre`}>Back</Link>
        <Link to='/playlist'>Get My Playlist!</Link>
      </div>
    )
  }  
}