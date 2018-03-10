import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { 
  createNewPlaylist,
  populatePlaylist,
  getPlaylistData 
} from '../../apiCalls';
import { savePlaylist } from '../../actions/actions';
import { playlistCleaner } from '../../dataCleaner';
import PropTypes from 'prop-types';
import './Playlist.css';

export class Playlist extends Component {
  constructor() {
    super();
    this.state = {
      playlistName: '',
      errorStatus: '',
      selectedTracks: [],
      page: 2
    };
  }
  
  componentDidMount = () => {
    window.addEventListener('scroll', this.getMoreSongs);
    const { user, newSeed } = this.props;
    const { spm, genre } = newSeed;
    const playlistName = `${user.name}'s ${spm} SPM, ${genre} playlist`;
    this.setState({ playlistName });
  }

  componentWillUnmount = () => {
    window.removeEventListener('scroll', this.getMoreSongs);
  }

  playlistToRender = () => {
    const { playlist } = this.props;
    const { selectedTracks } = this.state;
    return playlist.map(track => (
      <div
        onClick={() => this.selectTrack(track.uri)}
        key={track.id}
        className={`
          track 
          ${selectedTracks.includes(track.uri)
          ? 'selected'
          : ''
          }`
        }
        id={track.id}
      >
        <input
          type='checkbox'
          className='checkbox'
          id={track.uri}
          onClick={() => this.selectTrack(track.uri)}
        />
        <div>
          <h4 className='song-title'>{track.title}</h4>
          <h4 className='song-artist'>{track.artist}</h4>
        </div>
      </div>
    ));
  }

  selectTrack = (uri) => {
    const selected = document.getElementById(uri);
    selected.checked = !selected.checked;
    this.saveChecked();
  }

  toggleSelectAll = event => {
    const { checked } = event.target;
    const allCheckboxes = document.querySelectorAll('.checkbox');
    if (checked) {
      allCheckboxes.forEach( checkbox => checkbox.checked = true);
      this.saveChecked();
    } else {
      allCheckboxes.forEach( checkbox => checkbox.checked = false);
      this.saveChecked();
    }
  }

  saveChecked = () => {
    const allCheckboxes = document.querySelectorAll('.checkbox');
    let selectedTracks = [];
    allCheckboxes.forEach( checkbox => {
      if (checkbox.checked) {
        selectedTracks.push(checkbox.id);
      }
    });
    this.setState({selectedTracks});
  }

  sendToSpotify = async () => {
    const { user, accessToken } = this.props;
    const { playlistName, selectedTracks } = this.state;
    try {
      const playlistResponse = await 
        createNewPlaylist(user.id, accessToken, playlistName);
      const { playlistId } = playlistResponse;
      populatePlaylist(user.id, playlistId, accessToken, selectedTracks);
      this.changeButton();
    } catch (error) {
      this.setState({errorStatus: error.message});
    }
  }

  changeButton = () => {
    const sendButton = document.querySelector('.send');
    sendButton.innerText = 'Playlist Sent!';
    sendButton.setAttribute('disabled', true);
  }

  getMoreSongs = async () => {
    const { newSeed, accessToken } = this.props;
    const { page } = this.state;
    if (document.body.offsetHeight - 611 === window.scrollY &&
      this.state.page <= 5) {
      console.log(window.scrollY)
      console.log(document.body.offsetHeight - 611)
      try {
        const rawPlaylistData = await getPlaylistData(
          newSeed.spm, newSeed.genre, accessToken, page * 20
        );
        const cleanedPlaylist = playlistCleaner(rawPlaylistData.tracks);
        const nextPage = page + 1;
        this.setState({page: nextPage});
        this.props.savePlaylist(cleanedPlaylist);
      } catch (error) {
        this.setState({errorStatus: error.message});
      }
    }
  }

  render() {
    const { playlistName, selectedTracks } = this.state;
    const { playlist } = this.props;
    return (
      <div>
        <div className='playlist-header'>
          <div className='playlist-header-top'>
            <h2>{playlistName}</h2>
            <button
              disabled={!selectedTracks.length || selectedTracks.length > 100}
              className='buttons send'
              onClick={this.sendToSpotify}>
                Send to Spotify
            </button>
          </div>
          <div className='playlist-header-bottom'>
            <div className='select-all-box'>
              <p>All</p>
              <input
                type='checkbox'
                id='select-all' 
                onClick={this.toggleSelectAll}
              />
            </div>
            <h2>{`${selectedTracks.length} of ${playlist.length}
              selected (max 100)`}</h2>
          </div>
        </div>
        <div className='playlist'>
          {this.playlistToRender()}
          {/*<button
            className='buttons more-songs'
            disabled={this.state.page > 5}
            onClick={this.getMoreSongs}>Get More Songs
          </button>*/}
        </div>
      </div>
    );
  }
}

const { arrayOf, shape, string, number, func } = PropTypes;

Playlist.propTypes = {
  playlist: arrayOf(shape({
    artist: string,
    title: string,
    id: string,
    uri: string
  })),
  newSeed: shape({
    spm: number,
    genre: string
  }),
  user: shape({
    name: string,
    id: string
  }),
  accessToken: string,
  savePlaylist: func
};

export const MSTP = store => ({
  playlist: store.playlist,
  newSeed: store.newSeed,
  user: store.user,
  accessToken: store.accessToken
});

export const MDTP = dispatch => ({
  savePlaylist: playlist => dispatch(savePlaylist(playlist))
});

export default withRouter(connect(MSTP, MDTP)(Playlist));

// {<input
//             className='summary'
//             onChange={this.changePlaylistName}
//             value={this.state.playlistName}
//           />}
// console.log('updated')
// const { playlist } = this.props;

// changePlaylistName = (event) => {
//   const playlistName = event.target.value;
//   this.setState({playlistName});
// }
