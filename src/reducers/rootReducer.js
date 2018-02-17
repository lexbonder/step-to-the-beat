import { combineReducers } from 'redux';
import { accessTokenReducer } from './accessTokenReducer';
import { loggedInReducer } from './loggedInReducer';
import { userNameReducer } from './userNameReducer';

export const rootReducer = combineReducers({
  accessToken: accessTokenReducer,
  loggedIn: loggedInReducer,
  userName: userNameReducer
})