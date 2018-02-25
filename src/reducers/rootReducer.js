import { combineReducers } from 'redux';
import { accessTokenReducer } from './accessTokenReducer';
import { loggedInReducer } from './loggedInReducer';
import { userReducer } from './userReducer';
import { newSeedReducer } from './newSeedReducer';
import { recentSpmsReducer } from './recentSpmsReducer';
import { recentGenresReducer } from './recentGenresReducer';
import { recentSeedsReducer } from './recentSeedsReducer';
import { playlistReducer } from './playlistReducer';

export const rootReducer = combineReducers({
  accessToken: accessTokenReducer,
  loggedIn: loggedInReducer,
  user: userReducer,
  newSeed: newSeedReducer,
  recentSpms: recentSpmsReducer,
  recentGenres: recentGenresReducer,
  recentSeeds: recentSeedsReducer,
  playlist: playlistReducer
});