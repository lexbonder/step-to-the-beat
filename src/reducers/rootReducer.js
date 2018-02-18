import { combineReducers } from 'redux';
import { accessTokenReducer } from './accessTokenReducer';
import { loggedInReducer } from './loggedInReducer';
import { userNameReducer } from './userNameReducer';
import { seedsReducer } from './seedsReducer';
import { savedSpmsReducer } from './savedSpmsReducer';
import { playlistReducer } from './playlistReducer';

export const rootReducer = combineReducers({
  accessToken: accessTokenReducer,
  loggedIn: loggedInReducer,
  userName: userNameReducer,
  seeds: seedsReducer,
  savedSpms: savedSpmsReducer,
  playlist: playlistReducer
})