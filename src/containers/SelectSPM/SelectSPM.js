import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { selectSpm } from '../../actions/actions';
import './SelectSPM.css';

export class SelectSPM extends Component {

  getSavedSPMs = () => {
    const { savedSpms } = this.props
    if (savedSpms && savedSpms.length) {
      return savedSpms.map(spm => <option>{spm.spm}</option>)
    } else {
      return <option>No Saved SPMs</option>
    }  
  }

  handleClick = () => {
    const selectEelement = document.querySelector('select')
    const selectedSpm = selectEelement
      .options
      [selectEelement.selectedIndex]
      .innerText
    this.props.selectSpm(selectedSpm)
  }

  render() {
    return (
      <div className='SelectSPM'>
        <h2>Select SPM</h2>
        <div className='select-wrapper'>
          <Link
            className='add-new'
            to='/calculations'>Add new SPM</Link>
          <p>or select from below</p>
          <select size='2'>
            {this.getSavedSPMs()}
          </select>
          <Link to='/'>Cancel</Link>
          <Link onClick={this.handleClick} to={`/select-genre`}>Next</Link>
        </div>
      </div>
    )
  }
}

export const MSTP = store => ({
  savedSpms: store.savedSpms
})

export const MDTP = dispatch => ({
  selectSpm: spm => dispatch(selectSpm(spm))
})

export default withRouter(connect(MSTP, MDTP)(SelectSPM))