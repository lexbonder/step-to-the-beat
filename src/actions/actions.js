// accessTokenReducer

export const saveAccessToken = token => ({
  type: 'SAVE_ACCESS_TOKEN',
  token
});

export const clearAccessToken = () => ({
  type: 'CLEAR_ACCESS_TOKEN'
});

// loggedInReducer

export const logInUser = () => ({
  type: 'LOG_IN_USER',
  loggedIn: true
});

export const logOutUser = () => ({
  type: 'LOG_OUT_USER',
  loggedIn: false
});

// userReducer

export const saveUser = user => ({
  type: 'SAVE_USER',
  user
});

// newSeedReducer

export const selectSpm = spm => ({
  type: 'SELECT_SPM',
  spm
});

export const selectGenre = genre => ({
  type: 'SELECT_GENRE',
  genre
});

export const selectSeed = seed => ({
  type: 'SELECT_SEED',
  seed
});

// recentSpmReducer

export const saveRecentSpm = spm => ({
  type: 'SAVE_RECENT_SPM',
  spm
});

export const spmsFromFirebase = spms => ({
  type: 'SPMS_FROM_FIREBASE',
  spms
});

// recentGenreReducer

export const saveRecentGenre = genre => ({
  type: 'SAVE_RECENT_GENRE',
  genre
});

export const genresFromFirebase = genres => ({
  type: 'GENRES_FROM_FIREBASE',
  genres
});

// recentSeedReducer

export const saveRecentSeed = seed => ({
  type: 'SAVE_RECENT_SEED',
  seed
});

export const deleteSeed = id => ({
  type: 'DELETE_SEED',
  id
});

export const seedsFromFirebase = seeds => ({
  type: 'SEEDS_FROM_FIREBASE',
  seeds
});

// playlistReducer

export const savePlaylist = playlist => ({
  type: 'SAVE_PLAYLIST',
  playlist
});