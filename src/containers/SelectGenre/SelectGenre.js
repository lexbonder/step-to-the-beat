import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class SelectGenre extends Component {

  getGenres = () => {
    const myArray = [1,2,3] // This will be the array of genres passed from the songs after being filtered by spm
    return myArray.map(thing => <option>Yo Dawg</option>)
  }

  render() {
    return (
      <div>
        <select>
          {this.getGenres()}
        </select>
        <Link to='/select-spm'>Back</Link>
        <Link to='/confirm'>Next</Link>
      </div>
    )
  }
}