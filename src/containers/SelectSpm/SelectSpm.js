import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { selectSpm, saveRecentSpm } from '../../actions/actions';
import PropTypes from 'prop-types';
import './SelectSpm.css';

export class SelectSpm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selection: ''
    };
  }

  componentDidUpdate = () => {
    this.getRecentSpms();
  }

  getRecentSpms = () => {
    const { recentSpms } = this.props;
    if (recentSpms && recentSpms.length) {
      return (
        <div>
          <h3 className='recent-spms'>Past SPM's</h3>
          <ul className='spm-list'>
            {
              recentSpms.map((spm, index) => {
              return <li
                key={index} 
                onClick={this.selectRecent}>
                  {spm}
                </li>
              })
            }
          </ul>
        </div>
      )
    }
  }

  selectRecent = (event) => {
    const selection = parseInt(event.target.innerText, 10);
    this.setState({selection});
  }

  handleClick = () => {
    const { recentSpms, history } = this.props;
    const { selection } = this.state;
    this.props.selectSpm(selection);
    if (!recentSpms.includes(selection)) {
      this.props.saveRecentSpm(selection);
    }
    history.push('/select-genre');
  }

  handleChange = (event) => {
    const selection = parseInt(event.target.value, 10);
    this.setState({selection});
  }

  handleBackButton = () => {
    const { history } = this.props;
    history.push('/saved-playlists');
  }

  handleNewSpmButtion = () => {
    const { history } = this.props;
    history.push('/calculations');
  }

  render() {
    return (
      <div className='SelectSpm'>
        {this.getRecentSpms()}
        <h3 className='enter-spm'>Your Steps Per Minute</h3>
        <input
          type='number'
          name='selection'
          className='select-spm-input'
          value={this.state.selection}
          placeholder='Enter SPM'
          onChange={this.handleChange}
        />
        <button 
          onClick={this.handleNewSpmButtion}
          className='buttons new-spm-button'>
            Calculate
        </button>
        <div className='button-wrapper'>
          <button
            disabled={!this.state.selection}
            onClick={this.handleClick}
            className='buttons'>
              Select a Genre
          </button>
        </div>
      </div>
    );
  }
}

const { arrayOf, number, func, object } = PropTypes;

SelectSpm.propTypes = {
  recentSpms: arrayOf(number),
  saveRecentSpm: func,
  selectSpm: func,
  history: object
};

export const MSTP = ({recentSpms}) => ({recentSpms});

export const MDTP = dispatch => ({
  saveRecentSpm: spm => dispatch(saveRecentSpm(spm)),
  selectSpm: spm => dispatch(selectSpm(spm))
});

export default withRouter(connect(MSTP, MDTP)(SelectSpm));