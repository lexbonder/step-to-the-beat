export const playlistReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SELECT_SPM':
    return {...state, spm: action.spm}
    case 'SELECT_GENRE':
    return {...state, genre: action.genre}
  default:
    return state;
  }
}