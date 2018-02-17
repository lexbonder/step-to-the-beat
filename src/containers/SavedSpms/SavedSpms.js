import React, { Component } from 'react';
import './SavedSpms.css'

export class SavedSpms extends Component {

  render() {
    return (
      <div className='SavedSpms'>
        <ul>
          <li>SPM</li>
          <li>Pace</li>
          <li>Nickname</li>
        </ul>
        Saved Spm's get rendered here, More than likely using a .map() and creating a series of rows
      </div>
    )
  }
}