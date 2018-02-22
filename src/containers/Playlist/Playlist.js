import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './Playlist.css';

export class Playlist extends Component {

  playlistToRender = () => {
    const { playlist } = this.props;
    console.log(playlist)
    return playlist.map(track => (
      <div
        className='track'
        id={track.id}
      >
        <input type='checkbox' className='checkbox' />
        <h4>{track.title}</h4>
        <h4>{track.artist}</h4>
      </div>
    ))
  }

  toggleSelectAll = event => {
    const { checked } = event.target
    const allCheckboxes = document.querySelectorAll('.checkbox')
    if (checked) {
      allCheckboxes.forEach( checkbox => checkbox.checked = true)
    } else {
      allCheckboxes.forEach( checkbox => checkbox.checked = false)
    }
  }

  render() {
    const {spm, genre} = this.props.newSeed
    
    return (
      <div>
        <div>
          <h2 className='summary'>
            {`Your ${spm} SPM, ${genre} playlist`}
          </h2>
          <button>Send to Spotify</button>
        </div>
        <div className='playlist'>
          <input
            type='checkbox'
            id='select-all' 
            onClick={this.toggleSelectAll}
          />
          <h3>Title</h3>
          <h3>Artist</h3>
          {this.playlistToRender()}
        </div>
        <button>Send Playlist to Spotify</button>
      </div>
    )
  }
}

export const MSTP = store => ({
  playlist: store.playlist,
  newSeed: store.newSeed,
  user: store.user
})


export default withRouter(connect(MSTP)(Playlist))