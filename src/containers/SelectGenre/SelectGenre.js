import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { genres } from '../../genre-list';
import { selectGenre, saveRecentGenre } from '../../actions/actions';
import PropTypes from 'prop-types';
import './SelectGenre.css';

export class SelectGenre extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchParam: '',
      selectedGenre: ''
    };
  }

  getGenres = () => {
    const { searchParam } = this.state;
    const filteredGenres = genres.filter( genre =>
      genre.toLowerCase().includes(searchParam.toLowerCase())
    );
    return filteredGenres.map((genre, index) => 
      <li key={index} onClick={this.makeSelection}>{genre}</li>
    );
  }

  makeSelection = (event) => {
    document.querySelectorAll('li').forEach( item =>
      item.classList.remove('selected')
    );
    event.target.classList.add('selected');
    this.setState({selectedGenre: event.target.innerText});
  }

  handleClick = () => {
    const { history } = this.props;
    const genre = this.state.selectedGenre.toLowerCase();
    this.props.selectGenre(genre);
    this.props.saveRecentGenre(genre);
    history.push('/confirm');
  }

  handleSearchParam = (event) => {
    document.querySelectorAll('li').forEach( item =>
      item.classList.remove('selected')
    );
    const searchParam = event.target.value;
    this.setState({searchParam, selectedGenre: ''});
  }

  handleBackButton = () => {
    const { history } = this.props;
    history.push('/select-spm');
  }

  render() {
    return (
      <div className='SelectGenre'>
        <input 
          type='text'
          placeholder='Search'
          className='search-bar'
          value={this.state.searchParam}
          onChange={this.handleSearchParam}
        />
        <ul>
          {this.getGenres()}
        </ul>
        <div className='button-wrapper'> 
          <button
            className='buttons'
            onClick={this.handleBackButton}>
              Back
          </button>
          <button
            onClick={this.handleClick}
            disabled={!this.state.selectedGenre}
            className='buttons'>
              Confirm
          </button>
        </div>
      </div>
    );
  }
}

const { func, shape } = PropTypes;

SelectGenre.propTypes = {
  selectGenre: func,
  saveRecentGenre: func,
  history: shape({
    path: func
  })
};

export const MDTP = dispatch => ({
  selectGenre: genre => dispatch(selectGenre(genre)),
  saveRecentGenre: genre => dispatch(saveRecentGenre(genre))
});

export default withRouter(connect(null, MDTP)(SelectGenre));