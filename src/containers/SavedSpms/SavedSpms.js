import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { updateSpm } from '../../actions/actions';
import './SavedSpms.css';

export class SavedSpms extends Component {

  handleChange = (event) => {
    const { parentElement, name, value } = event.target
    const { savedSpms } = this.props
    const editedSpm = savedSpms.find( spm => spm.id === parseInt(parentElement.id))
    this.props.updateSpm({...editedSpm, [name]: value})
  }

  getSavedSPMs = () => {
    const { savedSpms } = this.props
    if (savedSpms && savedSpms.length) {
      return savedSpms.map(spm => {
        return (
          <div id={spm.id} className='spm'>
            <input
              onChange={this.handleChange}
              name='spm'
              value={spm.spm}  
            />
            <input
              onChange={this.handleChange}
              contenteditable='true'
              name='pace'
              value={spm.pace}
              placeholder='Add a pace'
            />
            <input
              onChange={this.handleChange}
              contenteditable='true'
              name='nickname'
              value={spm.nickname}
              placeholder='Add a nickname'
            />
          </div>
        )}
      )
    } else {
      return <h3 className='none'>You don't have any saved SPMs</h3>
    }  
  }

  render() {
    return (
      <div className='SavedSpms'>
        <h3>SPM</h3>
        <h3>Pace</h3>
        <h3>Nickname</h3>
        {this.getSavedSPMs()}
      </div>
    )
  }
}

export const MSTP = store => ({
  savedSpms: store.savedSpms
})

export const MDTP = dispatch => ({
  updateSpm: spm => dispatch(updateSpm(spm))
})

export default withRouter(connect(MSTP, MDTP)(SavedSpms))