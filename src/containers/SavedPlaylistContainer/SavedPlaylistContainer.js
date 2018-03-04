import React, { Component } from 'react';
import SavedPlaylist from '../SavedPlaylist/SavedPlaylist';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './SavedPlaylistContainer.css';

export class SavedPlaylistContainer extends Component {
  
  componentDidUpdate = () => {
    this.savedPlaylistsToRender()
  }

  savedPlaylistsToRender = () => {
    const { recentSeeds } = this.props;
    console.log(recentSeeds)
    if (recentSeeds.length) {
      return recentSeeds.map((seed, index) => <SavedPlaylist
        key={index} 
        seed={seed} 
      />);
    } else {
      return <h1 className='no-playlists'>
        You do not have any favorite playlists!
      </h1>;
    }  
  }

  handleClick = () => {
    this.props.history.push('/select-spm');
  }

  render() {
    return (
      <div className='SavedPlaylistContainer'>
        <button 
          className='buttons new-playlist'
          onClick={this.handleClick}>
            Get New Playlist
        </button>
        <div>
          {this.savedPlaylistsToRender()}
        </div>
      </div>
    );
  }
}

const { arrayOf, shape, number, string, func } = PropTypes;

SavedPlaylistContainer.propTypes = {
  recentSeeds: arrayOf(shape({
    spm: number,
    genre: string
  })),
  history: shape({
    push: func
  })
};

export const MSTP = ({recentSeeds}) => ({recentSeeds});

export default withRouter(connect(MSTP)(SavedPlaylistContainer));