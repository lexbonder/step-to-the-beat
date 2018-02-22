import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { genres } from '../../genre-list';
import { selectGenre, saveRecentGenre } from '../../actions/actions';
import './SelectGenre.css';

export class SelectGenre extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchParam: '',
      selectedGenre: ''
    }
  }

  getGenres = () => {
    const { searchParam } = this.state
    const filteredGenres = genres.filter( genre => {
      return genre.toLowerCase().includes(searchParam.toLowerCase())
    })
    return filteredGenres.map(genre => <li onClick={this.makeSelection}>{genre}</li>)
  }

  makeSelection = (event) => {
    document.querySelectorAll('li').forEach( item => {
      item.classList.remove('selected')
    })
    event.target.classList.add('selected')
    this.setState({selectedGenre: event.target.innerText})
  }

  handleClick = () => {
    const genre = this.state.selectedGenre.toLowerCase()
    this.props.selectGenre(genre)
    this.props.saveRecentGenre(genre)
  }

  handleSearchParam = (event) => {
    document.querySelectorAll('li').forEach( item => {
      item.classList.remove('selected')
    })
    const searchParam = event.target.value
    this.setState({searchParam, selectedGenre: ''})
  }

  render() {
    return (
      <div className='SelectGenre'>
        <h2>Select Genre</h2>
        <div className='select-wrapper'>
          <input 
            type='text'
            placeholder='Search'
            value={this.state.searchParam}
            onChange={this.handleSearchParam}
          />
          <ul>
            {this.getGenres()}
          </ul>
          <Link to='/select-spm'>Back</Link>
          <Link onClick={this.handleClick} to='/confirm'>Next</Link>
        </div>
      </div>
    )
  }
}

export const MDTP = dispatch => ({
  selectGenre: genre => dispatch(selectGenre(genre)),
  saveRecentGenre: genre => dispatch(saveRecentGenre(genre))
})

export default withRouter(connect(null, MDTP)(SelectGenre))
