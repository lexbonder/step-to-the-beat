export const favoriteSongsReducer = (state = [], action) => {
  switch (action.type) {
  case 'ADD_TO_FAVORITE_SONGS':
    return [...state, action.song];
  case 'REMOVE_FAVORITE_SONG':
    return state.filter( song => song.id !== action.id );
  default:
    return state;
  }
};