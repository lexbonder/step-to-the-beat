import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { genres } from '../../genre-list';

export class SelectGenre extends Component {

  getGenres = () => {
    return genres.map(genre => <option>{genre}</option>)
  }

  handleClick = () => {
    const selectEelement = document.querySelector('select')
    const selectedGenre = selectEelement
      .options
      [selectEelement.selectedIndex]
      .innerText
      .toLowerCase()
      
  }

  render() {
    return (
      <div>
        <select>
          {this.getGenres()}
        </select>
        <Link to='/select-spm'>Back</Link>
        <Link onClick={this.handleClick} to='/confirm'>Next</Link>
      </div>
    )
  }
}