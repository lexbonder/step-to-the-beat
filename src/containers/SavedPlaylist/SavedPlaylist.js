import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { savePlaylist, selectSeed, deleteSeed } from '../../actions/actions';
import { getPlaylistData } from '../../apiCalls';
import { playlistCleaner } from '../../dataCleaner';
import { deleteFirebaseSeed } from '../../firebaseCalls';
import PropTypes from 'prop-types';
import './SavedPlaylist.css';

export class SavedPlaylist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorState: '',
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

  handleDeleteButton = () => {
    const {deleteSeed, seed, user} = this.props;
    deleteFirebaseSeed(user.id, seed.id)
    deleteSeed(seed.id)
  }

  render() {
    const {seed, user} = this.props;
    return (
      <div className='saved-playlist'>
        <div>
          <h2 className='playlist-name'>
            {`${user.name}'s ${seed.spm} SPM, ${seed.genre} playlist`}
          </h2>
          <h3 className='playlist-details'>
            {seed.spm} SPM &bull; {seed.genre}
          </h3>
        </div>
        <button 
          className='buttons'
          onClick={this.handleClick}>
            View
        </button>
        <button
          id={seed.id}
          onClick={this.handleDeleteButton}
          className='buttons delete'>
          X</button>
      </div>
    );
  }
}

const { string, func, shape, number } = PropTypes;

SavedPlaylist.propTypes = {
  user: shape({
    name: string,
    id: string,
    image: string
  }),
  accessToken: string,
  savePlaylist: func,
  selectSeed: func,
  seed: shape({
    spm: number,
    genre: string
  })
};

export const MSTP = ({accessToken, user}) => ({accessToken, user});

export const MDTP = dispatch => ({
  savePlaylist: playlist => dispatch(savePlaylist(playlist)),
  selectSeed: seed => dispatch(selectSeed(seed)),
  deleteSeed: id => dispatch(deleteSeed(id))
});

export default withRouter(connect(MSTP, MDTP)(SavedPlaylist));