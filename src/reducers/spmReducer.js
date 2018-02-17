export const spmReducer = (state = [], action) => {
  switch (action.type) {
  case 'SAVE_SPM':
    return [...state, action.spm]
  default:
    return state;
  }
}