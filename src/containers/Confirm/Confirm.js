import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { getPlaylistData } from '../../apiCalls';
import { playlistCleaner } from '../../dataCleaner';
import { savePlaylist } from '../../actions/actions';
import './Confirm.css';

export class Confirm extends Component {
  
  getPlaylist = async () => {
    const {seeds, accessToken } = this.props
    const rawPlaylistData = await getPlaylistData(seeds.spm, seeds.genre, accessToken)
    const cleanedPlaylist = playlistCleaner(rawPlaylistData.tracks)
    this.props.savePlaylist(cleanedPlaylist)
  }
// {spm}
//{ genre.charAt(0).toUpperCase() + genre.slice(1) }
  render() {
    const { spm, genre } = this.props.seeds
    return (
      <div className='Confirm' >
        <h2>Confirm</h2>
        <p>Steps per Minute</p>
        <h2>{spm}</h2>
        <p>Genre</p>
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

export const MDTP = dispatch => ({
  savePlaylist: playlist => dispatch(savePlaylist(playlist))
})

export default withRouter(connect(MSTP, MDTP)(Confirm))