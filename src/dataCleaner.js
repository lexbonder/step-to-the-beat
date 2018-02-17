export const playlistCleaner = rawPlaylist => {
  return rawPlaylist.map(track => ({
    artist: track.artists[0].name,
    title: track.name,
    id: track.id,
    albumCoverLarge: track.album.images[0].url,
    albumCoverMedium: track.album.images[1].url,
    albumCoverSmall: track.album.images[2].url
  }))
}