export const accessTokenReducer = (state = '', action) => {
  switch (action.type) {
  case 'SAVE_ACCESS_TOKEN':
    return action.token;
  case 'CLEAR_ACCESS_TOKEN':
    return '';
  default:
    return state;
  }
};