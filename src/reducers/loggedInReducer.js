export const loggedInReducer = (state = false, action) => {
  switch (action.type) {
  case 'LOG_IN_USER':
    return action.loggedIn;
  case 'LOG_OUT_USER':
    return action.loggedIn;
  default:
    return state;
  }
};