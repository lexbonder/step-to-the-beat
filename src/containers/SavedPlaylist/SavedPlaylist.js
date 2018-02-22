import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { savePlaylist, selectSeed } from '../../actions/actions';
import { getPlaylistData } from '../../apiCalls';
import { playlistCleaner } from '../../dataCleaner';
import './SavedPlaylist.css';

export class SavedPlaylist extends Component {

  handleClick = async () => {
    const {seed, accessToken, history } = this.props;
    const { spm, genre } = seed;
    const rawPlaylistData = await getPlaylistData(spm, genre, accessToken);
    const cleanedPlaylist = playlistCleaner(rawPlaylistData.tracks);
    this.props.savePlaylist(cleanedPlaylist);
    this.props.selectSeed(seed);
    history.push('/playlist');
  }

  render() {
    const {spm, genre} = this.props.seed;
    return (
      <div className='savedPlaylist'>
        <h2>Playlist Name</h2>
        <h2>{spm}</h2>
        <h2>{genre}</h2>
        <button onClick={this.handleClick}>Get Now</button>
      </div>
    );
  }
}

export const MSTP = store => ({
  accessToken: store.accessToken
});

export const MDTP = dispatch => ({
  savePlaylist: playlist => dispatch(savePlaylist(playlist)),
  selectSeed: seed => dispatch(selectSeed(seed))
});

export default withRouter(connect(MSTP, MDTP)(SavedPlaylist));