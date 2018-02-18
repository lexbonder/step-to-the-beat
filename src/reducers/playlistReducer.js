export const playlistReducer = (state = [], action) => {
  switch (action.type) {
  case 'SAVE_PLAYLIST':
    return action.playlist;
  default:
    return state;
  }
}