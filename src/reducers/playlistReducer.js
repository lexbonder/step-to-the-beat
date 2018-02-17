export const playlistReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SAVE_SPM':
    return {...state, spm: action.spm}
    case 'SAVE_GENRE':
    return {...state, genre: action.genre}
  default:
    return state;
  }
}