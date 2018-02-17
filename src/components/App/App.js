import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Header from '../../containers/Header/Header';
import Home from '../../containers/Home/Home';
import Login from '../../containers/Login/Login';
import SelectGenre from '../../containers/SelectGenre/SelectGenre';
import Calculations from '../Calculations/Calculations';
import { SavedSpms } from '../../containers/SavedSpms/SavedSpms';
import { FavoriteSongs } from '../../containers/FavoriteSongs/FavoriteSongs';
import { FavoritePlaylists } from '../../containers/FavoritePlaylists/FavoritePlaylists';
import { SelectSPM } from '../../containers/SelectSPM/SelectSPM';
import { Confirm } from '../../containers/Confirm/Confirm';
import './App.css';

export class App extends Component {

  render() {
    return (
      <div>
        <Route path='/' component={Header} />
        <Route path='/' component={Home} /> 
        
        <Route exact path='/calculations' component={Calculations} />
        <Route exact path='/saved-spms' component={SavedSpms}/>
        <Route exact path='/favorite-songs' component={FavoriteSongs} />
        <Route exact path='/favorite-playlists' component={FavoritePlaylists} />
        <Route exact path='/select-spm' component={SelectSPM} />
        <Route exact path='/select-genre' component={SelectGenre} />
        <Route exact path='/confirm' component={Confirm} />
        
        <Route exact path='/login' component={Login} />
      </div>
    )
  }
}