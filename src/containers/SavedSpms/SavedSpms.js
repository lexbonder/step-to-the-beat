import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './SavedSpms.css'

export class SavedSpms extends Component {

  getSavedSPMs = () => {
    const { savedSpms } = this.props
    if (savedSpms && savedSpms.length) {
      return savedSpms.map(spm => {
        return (
          <div className='spm'>
            <h4>{spm}</h4>
            <h4 contenteditable='true'></h4>
            <h4 contenteditable='true'></h4>
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

export default withRouter(connect(MSTP)(SavedSpms))