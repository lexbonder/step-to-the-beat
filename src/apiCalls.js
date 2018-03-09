/* eslint-disable */
import { authorize } from './authorizeSpotify';

export const getUserName = async (accessToken) => {
  try {
    const initialFetch = await fetch('https://api.spotify.com/v1/me', {
      headers:{ Authorization: 'Bearer ' + accessToken }
    });
    if (initialFetch.status < 300) {
      return await initialFetch.json();
    } else if ( initialFetch.status === 401 ) {
      authorize()
      throw new Error('Your session with spotify timed out, try again')
    } else {
      throw new Error('Failed to get User Name')
    }
  } catch (error) {
    throw (error)
  }
};

export const getPlaylistData = async (bpm, genre, accessToken, limit = 20) => {
  try {
    const initialFetch = await fetch(`https://api.spotify.com/v1/recommendations?seed_genres=${genre}&target_tempo=${bpm}&limit=${limit}`,
      { headers: { Authorization: 'Bearer ' + accessToken, }
      });
    if (initialFetch.status < 300) {
      return await initialFetch.json();
    } else if ( initialFetch.status === 401 ) {
      authorize()
      throw new Error('Your session with spotify timed out, try again')
    } else {
      throw new Error('Failed to Retrieve Playlist Data')
    }
  } catch (error) {
    throw (error)
  }
};

export const createNewPlaylist = async (userId, accessToken, playlistName) => {
  const playlistBody = {
    name: `${playlistName} (Step to the Beat)`
  };
  try {
    const initialFetch = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
      method: 'POST',
      body: JSON.stringify(playlistBody),
      headers: {
        Authorization: 'Bearer ' + accessToken,
        'Content-Type': 'application/json'
      }
    });
    if (initialFetch.status < 300) {
      const response = await initialFetch.json();
      return {
        response: `Playlist Sent!`,
        playlistId: response.id
      };
    } else if ( initialFetch.status === 401 ) {
      authorize()
      throw new Error('Your session with spotify timed out, try again')
    } else {
      throw new Error('Create New Playlist in Spotify Failed')
    }
  } catch (error) {
    throw error
  }
};

export const populatePlaylist = async (userId, playlistId, accessToken, tracks) => {
  const playlistTracks = {uris: tracks};
  try {
    const initialFetch = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
      method: 'POST',
      body: JSON.stringify(playlistTracks),
      headers: {
        Authorization: 'Bearer ' + accessToken,
        'Content-Type': 'application/json'
      }
    });
    if (initialFetch.status < 300) {
      return await initialFetch.status
    } else if ( initialFetch.status === 401 ) {
      authorize()
      throw new Error('Your session with spotify timed out, try again')
    } else {
      throw new Error('Add Songs to Playlist Failed')
    }
  } catch (error) {
    throw error
  }
};