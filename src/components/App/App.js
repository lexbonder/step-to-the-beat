import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Header from '../../containers/Header/Header';
import Home from '../../containers/Home/Home';
import Login from '../../containers/Login/Login';
import SelectGenre from '../../containers/SelectGenre/SelectGenre';
import Calculations from '../../containers/Calculations/Calculations';
import SelectSpm from '../../containers/SelectSpm/SelectSpm';
import Confirm from '../../containers/Confirm/Confirm';
import Playlist from '../../containers/Playlist/Playlist';
import SavedPlaylistContainer from 
  '../../containers/SavedPlaylistContainer/SavedPlaylistContainer';
import './App.css';

export class App extends Component {

  render() {
    return (
      <div>
        <Route 
          exact path='/' 
          component={Home} /> 
        
        <Route 
          path='/' 
          component={Header} />
        
        <Route 
          exact path='/calculations'
          component={Calculations} />
        <Route 
          exact path='/saved-playlists' 
          component={SavedPlaylistContainer} />
        <Route
          exact path='/select-spm' 
          component={SelectSpm} />
        <Route
          exact path='/select-genre'
          component={SelectGenre} />
        <Route
          exact path='/confirm' 
          component={Confirm} />
        <Route
          exact path='/playlist' 
          component={Playlist} />
        
        <Route 
          exact path='/login' 
          component={Login} />
      </div>
    );
  }
}