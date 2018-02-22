export const recentSpmsReducer = (state = [], action) => {
  switch (action.type) {
  case 'SAVE_RECENT_SPM':
    return [...state, action.spm];
  case 'SPMS_FROM_FIREBASE':
    return action.spms
  default:
    return state;
  }
}
