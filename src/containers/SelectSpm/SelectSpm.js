import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
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

  componentDidMount = () => {
    if (this.props.location.state) {
      const { selection } = this.props.location.state
      this.setState({selection})
    }
  }

  componentDidUpdate = () => {
    this.getRecentSpms();
  }

  getRecentSpms = () => {
    const { recentSpms } = this.props;
    if (recentSpms && recentSpms.length) {
      return recentSpms.map((spm, index) => {
        return <li
          key={index} 
          onClick={this.selectRecent}
          className='spm-list-item'>
          {spm}
        </li>;
      });
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

  render() {
    return (
      <div className='SelectSpm'>
        <h2 className='recent-spms'>Your Recent SPMs</h2>
        <div className='ul-wrapper'>
          <ul className='spm-list'>
            {this.getRecentSpms()}
            <Link 
              className='link-to-calc'
              to='/calculations'>
              <li className='spm-list-item'>
                Calculate a new SPM...
              </li>
            </Link>
          </ul>
        </div>
        <h3 className='spm-instructions'>Enter an SPM or select from above</h3>
        <input
          type='number'
          name='selection'
          className='select-spm-input'
          value={this.state.selection}
          placeholder='Enter SPM'
          onChange={this.handleChange}
        />
        <div className='button-wrapper'>
          <button
            onClick={this.handleBackButton}
            className='buttons'>
              Cancel
          </button>
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