import { combineReducers } from 'redux';
import { accessTokenReducer } from './accessTokenReducer';
import { loggedInReducer } from './loggedInReducer';
import { userNameReducer } from './userNameReducer';
import { playlistReducer } from './playlistReducer';
import { savedSpmsReducer } from './savedSpmsReducer';

export const rootReducer = combineReducers({
  accessToken: accessTokenReducer,
  loggedIn: loggedInReducer,
  userName: userNameReducer,
  playlist: playlistReducer,
  savedSpms: savedSpmsReducer
})