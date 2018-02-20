import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { genres } from '../../genre-list';
import { selectGenre } from '../../actions/actions';
import './SelectGenre.css';

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
    this.props.selectGenre(selectedGenre)
  }

  render() {
    return (
      <div className='SelectGenre'>
        <h2>Select Genre</h2>
        <div className='select-wrapper'>
          <select size='3'>
            {this.getGenres()}
          </select>
          <Link to='/select-spm'>Back</Link>
          <Link onClick={this.handleClick} to='/confirm'>Next</Link>
        </div>
      </div>
    )
  }
}

export const MDTP = dispatch => ({
  selectGenre: genre => dispatch(selectGenre(genre))
})

export default withRouter(connect(null, MDTP)(SelectGenre))
