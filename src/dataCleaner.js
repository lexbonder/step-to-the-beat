/* eslint-disable */
export const playlistCleaner = rawPlaylist => {
  return rawPlaylist.map(track => ({
    artist: track.artists[0].name,
    title: track.name,
    id: track.id,
    uri: track.uri
  }));
};

export const userCleaner = rawUser => {
  const displayName = rawUser.display_name 
    ? rawUser.display_name.split(' ')[0] 
    : rawUser.id
  const userImage = rawUser.images.length
    ? rawUser.images[0].url
    : 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'
  return {
    name: displayName,
    id: rawUser.id,
    image: userImage
  }
}