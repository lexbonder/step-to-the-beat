/* eslint-disable */
export const getUserName = async (accessToken) => {
  try {
    const initialFetch = await fetch('https://api.spotify.com/v1/me', {
      headers:{ Authorization: 'Bearer ' + accessToken }
    });
    if (initialFetch.status < 300) {
      const userInfo = await initialFetch.json();
      return {
        name: userInfo.display_name.split(' ')[0],
        id: userInfo.id
      };
    } else {
      throw new Error('Failed to get User Name')
    }
  } catch (error) {
    throw (error)
  }
};

export const getPlaylistData = async (bpm, genre, accessToken) => {
  try {
    const initialFetch = await fetch(`https://api.spotify.com/v1/recommendations?seed_genres=${genre}&target_tempo=${bpm}`,
      { headers: { Authorization: 'Bearer ' + accessToken }
      });
    if (initialFetch.status < 300) {
      return await initialFetch.json();
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
        response: `${playlistName} created successfully`,
        playlistId: response.id
      };
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
    if (initialFetch.status >= 300) {
      throw new Error('Add Songs to Playlist Failed')
    }
  } catch (error) {
    throw error
  }
};