export const playlistReducer = (state = [], action) => {
  switch (action.type) {
  case 'SAVE_PLAYLIST':
    return action.playlist;
  case 'REMOVE_FROM_PLAYLIST':
    return state.filter(track => track.id !== action.id)
  default:
    return state;
  }
}