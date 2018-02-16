export const saveAccessToken = (token) => ({
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