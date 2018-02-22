import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { getPlaylistData } from '../../apiCalls';
import { playlistCleaner } from '../../dataCleaner';
import { savePlaylist, saveRecentSeed } from '../../actions/actions';
import { userContentToFirebase } from '../../firebaseCalls';
import './Confirm.css';

export class Confirm extends Component {

  componentDidMount = () => {
    const { newSeed } = this.props;
    this.props.saveRecentSeed(newSeed);
  }
  
  getPlaylist = async () => {
    const {
      newSeed,
      accessToken,
      recentSpms,
      recentGenres,
      user,
      recentSeeds
    } = this.props;
    const { spm, genre } = newSeed;
    const rawPlaylistData = await getPlaylistData(spm, genre, accessToken);
    const cleanedPlaylist = playlistCleaner(rawPlaylistData.tracks);
    this.props.savePlaylist(cleanedPlaylist);
    userContentToFirebase(user.id, recentSpms, recentGenres, recentSeeds);
  }
  // {spm}
  //{ genre.charAt(0).toUpperCase() + genre.slice(1) }
  render() {
    const { spm, genre } = this.props.newSeed;
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
    );
  }  
}

export const MSTP = store => ({
  newSeed: store.newSeed,
  user: store.user,
  recentSpms: store.recentSpms,
  recentGenres: store.recentGenres,
  recentSeeds: store.recentSeeds,
  accessToken: store.accessToken
});

export const MDTP = dispatch => ({
  savePlaylist: playlist => dispatch(savePlaylist(playlist)),
  saveRecentSeed: seed => dispatch(saveRecentSeed(seed))
});

export default withRouter(connect(MSTP, MDTP)(Confirm));