export const playlistCleaner = rawPlaylist => {
  return rawPlaylist.map(track => ({
    artist: track.artists[0].name,
    title: track.name,
    id: track.id,
    uri: track.uri
  }));
};