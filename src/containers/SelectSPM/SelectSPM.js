import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { selectSpm, saveRecentSpm } from '../../actions/actions';
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
      return recentSpms.map((spm, index) => {
        return <li key={index} onClick={this.selectRecent}>{spm}</li>;
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

  render() {
    return (
      <div className='SelectSpm'>
        <h2>Select SPM</h2>
        <div className='select-wrapper'>
          <p>Your recent SPMs</p>
          <ul>
            {this.getRecentSpms()}
            <li>
              <Link to='/calculations'>
                  Calculate a new SPM...
              </Link>
            </li>
          </ul>
          <p>Enter an SPM or select from above</p>
          <input
            type='number'
            name='selection'
            value={this.state.selection}
            placeholder='Enter SPM'
            onChange={this.handleChange}
          />
          <button to='/favorite-playlists'>Cancel</button>
          <button disabled={!this.state.selection} onClick={this.handleClick}>
              Select a Genre
          </button>
        </div>
      </div>
    );
  }
}

export const MSTP = ({recentSpms}) => ({recentSpms});

export const MDTP = dispatch => ({
  saveRecentSpm: spm => dispatch(saveRecentSpm(spm)),
  selectSpm: spm => dispatch(selectSpm(spm))
});

export default withRouter(connect(MSTP, MDTP)(SelectSpm));