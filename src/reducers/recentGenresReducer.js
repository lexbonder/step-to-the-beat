export const recentGenresReducer = (state = [], action) => {
  switch (action.type) {
  case 'SAVE_RECENT_GENRE':
    return [...state, action.genre];
  case 'GENRES_FROM_FIREBASE':
    return action.genres;
  default:
    return state;
  }
};
