export const newSeedReducer = (state = {}, action) => {
  switch (action.type) {
  case 'SELECT_SPM':
    return {...state, spm: action.spm}
  case 'SELECT_GENRE':
    return {...state, genre: action.genre}
  case 'SELECT_SEED':
    return action.seed
  default:
    return state;
  }
}