export const userNameReducer = (state = '', action) => {
  switch (action.type) {
  case 'SAVE_USER_NAME':
    return action.userName;
  default:
    return state;
  }
}