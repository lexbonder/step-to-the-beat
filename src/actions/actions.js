export const saveAccessToken = token => ({
  type: 'SAVE_ACCESS_TOKEN',
  token
})

export const clearAccessToken = () => ({
  type: 'CLEAR_ACCESS_TOKEN'
})

export const logInUser = () => ({
  type: 'LOG_IN_USER',
  loggedIn: true
})

export const logOutUser = () => ({
  type: 'LOG_OUT_USER',
  loggedIn: false
})

export const saveUser = user => ({
  type: 'SAVE_USER',
  user
})

export const selectSpm = spm => ({
  type: 'SELECT_SPM',
  spm
})

export const selectGenre = genre => ({
  type: 'SELECT_GENRE',
  genre
})

export const saveSpm = spm => ({
  type: 'SAVE_SPM',
  spm
})


// Playlist 

export const savePlaylist = playlist => ({
  type: 'SAVE_PLAYLIST',
  playlist
})

export const removeFromPlaylist = id => ({
  type: 'REMOVE_FROM_PLAYLIST',
  id
})

// Favorite Songs

export const addToFavoriteSongs = song => ({
  type: 'ADD_TO_FAVORITE_SONGS',
  song
})

export const removeFavoriteSong = id => ({
  type: 'REMOVE_FAVORITE_SONG',
  id
})