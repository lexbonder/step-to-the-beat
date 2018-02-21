import { combineReducers } from 'redux';
import { accessTokenReducer } from './accessTokenReducer';
import { loggedInReducer } from './loggedInReducer';
import { userReducer } from './userReducer';
import { seedsReducer } from './seedsReducer';
import { savedSpmsReducer } from './savedSpmsReducer';
import { playlistReducer } from './playlistReducer';
import { favoriteSongsReducer } from './favoriteSongsReducer';

export const rootReducer = combineReducers({
  accessToken: accessTokenReducer,
  loggedIn: loggedInReducer,
  user: userReducer,
  seeds: seedsReducer,
  savedSpms: savedSpmsReducer,
  playlist: playlistReducer,
  favoriteSongs: favoriteSongsReducer
})