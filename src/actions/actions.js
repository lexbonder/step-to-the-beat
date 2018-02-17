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

export const saveUserName = userName => ({
  type: 'SAVE_USER_NAME',
  userName
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