import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { getPlaylistData } from '../../apiCalls';
import { playlistCleaner } from '../../dataCleaner';

export class Confirm extends Component {
  
  getPlaylist = async () => {
    const {seeds, accessToken } = this.props
    const rawPlaylistData = await getPlaylistData(seeds.spm, seeds.genre, accessToken)
    const cleanedPlaylist = playlistCleaner(rawPlaylistData.tracks)
    console.log(cleanedPlaylist)
  }

  render() {
    const { spm, genre } = this.props.seeds
    return (
      <div>
        <h2>Confirm</h2>
        <h2>{ spm }</h2>
        <h2>
          { genre.charAt(0).toUpperCase() + genre.slice(1) }
        </h2>
        <Link to={`/select-genre`}>Back</Link>
        <Link onClick={this.getPlaylist} to='/playlist'>Get My Playlist!</Link>
      </div>
    )
  }  
}

export const MSTP = store => ({
  seeds: store.seeds,
  accessToken: store.accessToken
})

export default withRouter(connect(MSTP)(Confirm))