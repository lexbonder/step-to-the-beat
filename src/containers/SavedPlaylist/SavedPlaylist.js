import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { savePlaylist, selectSeed } from '../../actions/actions';
import { getPlaylistData } from '../../apiCalls';
import { playlistCleaner } from '../../playlistCleaner';
import PropTypes from 'prop-types';
import './SavedPlaylist.css';

export class SavedPlaylist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorState: ''
    };
  }

  handleClick = async () => {
    const {seed, accessToken, history } = this.props;
    const { spm, genre } = seed;
    try {
      const rawPlaylistData = await getPlaylistData(spm, genre, accessToken);
      const cleanedPlaylist = playlistCleaner(rawPlaylistData.tracks);
      this.props.savePlaylist(cleanedPlaylist);
      this.props.selectSeed(seed);
      history.push('/playlist');
    } catch (error) {
      this.setState({errorState: error.message});
    }
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

const { string, func, shape, number } = PropTypes;

SavedPlaylist.propTypes = {
  accessToken: string,
  savePlaylist: func,
  selectSeed: func,
  seed: shape({
    spm: number,
    genre: string
  })
};

export const MSTP = ({accessToken}) => ({accessToken});

export const MDTP = dispatch => ({
  savePlaylist: playlist => dispatch(savePlaylist(playlist)),
  selectSeed: seed => dispatch(selectSeed(seed))
});

export default withRouter(connect(MSTP, MDTP)(SavedPlaylist));