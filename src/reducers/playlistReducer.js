export const playlistReducer = (state = [], action) => {
  switch (action.type) {
  case 'SAVE_PLAYLIST':
    return action.playlist;
  case 'ADD_TO_PLAYLIST':
    return [...state, ...action.playlist];
  default:
    return state;
  }
};