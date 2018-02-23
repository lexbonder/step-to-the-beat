export const getUserName = async (accessToken) => {
  const initialFetch = await fetch('https://api.spotify.com/v1/me', {
    headers:{ Authorization: 'Bearer ' + accessToken }
  });
  const userInfo = await initialFetch.json();
  return {
    name: userInfo.display_name.split(' ')[0],
    id: userInfo.id
  };
};

export const getPlaylistData = async (bpm, genre, accessToken) => {
  const initialFetch = await fetch(`https://api.spotify.com/v1/recommendations
    ?seed_genres=${genre}&target_tempo=${bpm}`,
      { headers: { Authorization: 'Bearer ' + accessToken }
      });
  return await initialFetch.json();
};

export const createNewPlaylist = async (userId, accessToken, playlistName) => {
  const playlistBody = {
    name: `${playlistName}, made with Step to the Beat`
  };
  const initialFetch = await fetch(`https://api.spotify.com/v1/users
    /${userId}/playlists`, {
    method: 'POST',
    body: JSON.stringify(playlistBody),
    headers: {
      Authorization: 'Bearer ' + accessToken,
      'Content-Type': 'application/json'
    }
  });
  const response = await initialFetch.json();
  return {
    response: `${response.name} created successfully`,
    playlistId: response.id
  };
};

export const populatePlaylist = async (userId, playlistId, accessToken, tracks) => {
  const playlistTracks = {uris: tracks};
  const initialFetch = await fetch(`https://api.spotify.com/v1/users
    /${userId}/playlists/${playlistId}/tracks`, {
    method: 'POST',
    body: JSON.stringify(playlistTracks),
    headers: {
      Authorization: 'Bearer ' + accessToken,
      'Content-Type': 'application/json'
    }
  });
  const response = await initialFetch.json();
};