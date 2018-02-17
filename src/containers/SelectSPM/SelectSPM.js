import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

export class SelectSPM extends Component {

  getSavedSPMs = () => {
    const { spms } = this.props
    if (spms && spms.length) {
      return spms.map(spm => <option>{spm}</option>)
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
        <Link onClick={this.handleClick} to={`/select-genre`}>Next</Link> {/*Figure out this..*/}
      </div>
    )
  }
}

export const MSTP = store => ({
  spms: store.spms
})

export default withRouter(connect(MSTP)(SelectSPM))