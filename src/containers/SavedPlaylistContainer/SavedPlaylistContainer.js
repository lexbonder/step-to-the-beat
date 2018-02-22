import React, { Component } from 'react';
import SavedPlaylist from '../../components/SavedPlaylist/SavedPlaylist';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './SavedPlaylistContainer.css';

export class SavedPlaylistContainer extends Component {
  
  savedPlaylistsToRender = () => {
    const { recentSeeds } = this.props;
    if (recentSeeds.length) {
      return recentSeeds.map(seed => <SavedPlaylist seed={seed} />);
    } else {
      return <h1>You do not have any favorited playlists!</h1>;
    }  
  }

  handleClick = () => {
    this.props.history.push('/select-spm');
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>
          Get New Playlist
        </button>
        <div>
          <h2>Nickname</h2>
          <h2>SPM</h2>
          <h2>Genre</h2>
          {this.savedPlaylistsToRender()}
        </div>
      </div>
    );
  }
}

export const MSTP = store => ({
  recentSeeds: store.recentSeeds
});

export default withRouter(connect(MSTP)(SavedPlaylistContainer));