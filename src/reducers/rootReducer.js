import { combineReducers } from 'redux';
import { accessTokenReducer } from './accessTokenReducer';
import { loggedInReducer } from './loggedInReducer';
import { userNameReducer } from './userNameReducer';
import { playlistReducer } from './playlistReducer';
import { spmReducer } from './spmReducer';

export const rootReducer = combineReducers({
  accessToken: accessTokenReducer,
  loggedIn: loggedInReducer,
  userName: userNameReducer,
  playlist: playlistReducer,
  spm: spmReducer
})