import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class SelectSPM extends Component {

  getSavedSPMs = () => {
    const myArray = [1,2,3] // This will be the array of saved SPMs retrieved from the store
    if (myArray.length) {
      return myArray.map(thing => <option>Yo Dawg</option>)
    } else {
      return <option>No Saved SPMs</option>
    }  
  }
  render() {
    return (
      <div>
        <Link to='/calculations'>Add new SPM</Link>
        <p>or select from below</p>
        <select>
          {this.getSavedSPMs()}
        </select>
        <Link to='/'>Cancel</Link>
        <Link to={`/select-genre`}>Next</Link> {/*Figure out this..*/}
      </div>
    )
  }
}