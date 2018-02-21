export const savedSpmsReducer = (state = [], action) => {
  switch (action.type) {
  case 'SAVE_SPM':
    return [...state, action.spm];
  case 'UPDATE_SPM':
    const updated = state.filter(spm => spm.id !== action.spm.id);
    return [...updated, action.spm];
  default:
    return state;
  }
}
