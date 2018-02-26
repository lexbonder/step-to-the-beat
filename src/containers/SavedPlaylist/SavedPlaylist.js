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
      errorState: '',
      spm: '',
      genre: '',
      playlistName: ''
    };
  }

  componentDidMount = () => {
    const { user, seed } = this.props;
    const {spm, genre} = seed;
    this.setState({
      spm,
      genre,
      playlistName: `${user.name}'s ${spm} SPM, ${genre} playlist`
    });
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
    const {playlistName, spm, genre} = this.state;
    return (
      <div className='saved-playlist'>
        <div>
          <h2 className='playlist-name'>
            {playlistName}
          </h2>
          <h3 className='playlist-details'>
            {spm} SPM &bull; {genre}
          </h3>
        </div>
        <button 
          className='next-and-back-buttons'
          onClick={this.handleClick}>
            View
        </button>
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
  selectSeed: seed => dispatch(selectSeed(seed))
});

export default withRouter(connect(MSTP, MDTP)(SavedPlaylist));