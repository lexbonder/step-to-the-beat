export const recentSeedsReducer = (state = [], action) => {
  switch (action.type) {
  case 'SAVE_RECENT_SEED':
    return [...state, action.seed];
  case 'SEEDS_FROM_FIREBASE':
    return action.seeds
  default:
    return state;
  }
}