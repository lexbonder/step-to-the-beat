export const playlistCleaner = rawPlaylist => {
  return rawPlaylist.map(track => ({
    artist: track.artists[0].name,
    title: track.name,
    id: track.id,
    albumCover: track.album.images[2].url
  }))
}