export const userReducer = (state = {}, action) => {
  switch (action.type) {
  case 'SAVE_USER':
    return action.user;
  default:
    return state;
  }
};