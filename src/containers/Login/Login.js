import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { saveAccessToken, logInUser, saveUser, addToFavoriteSongs } from '../../actions/actions';
import { getUserName } from '../../apiCalls.js';
import { getUserFavorites } from '../../firebaseCalls';
// import * as firebase from 'firebase';

export class Login extends Component {

  componentDidMount = () => {
    if ( this.props.location.hash ) {
      const fullHash = this.props.location.hash.substr(1)
      const accessToken = fullHash.split('&')[0].split('=')[1]
      this.props.saveAccessToken(accessToken)
      this.props.logInUser()
    } else {
      alert('You were not signed in')
    }
  }

  componentDidUpdate = async () => {
    if (this.props.accessToken) {
      const user = await getUserName(this.props.accessToken)
      const userFaves = await getUserFavorites(user.id)
      this.userFavesToStore(userFaves.val())
      // this.userIntoLocalStorage(user)
      this.props.saveUser(user)
    }
    this.props.history.push('/')
  }

  // userIntoLocalStorage = (user) => {
  //   const stringified = JSON.stringify(user)
  //   localStorage.setItem(user.id, stringified)
  // }

  userFavesToStore = userFaves => {
    const { favoriteSongs } = userFaves
    favoriteSongs.forEach(favorite => this.props.addToFavoriteSongs(favorite))
  }

  render () {
    return(
      <div></div>
    )
  }
}

export const MSTP = store => ({
  accessToken: store.accessToken
})

export const MDTP = dispatch => ({
  saveAccessToken: accessToken => dispatch(saveAccessToken(accessToken)),
  logInUser: () => dispatch(logInUser()),
  saveUser: user => dispatch(saveUser(user)),
  addToFavoriteSongs: favorite => dispatch(addToFavoriteSongs(favorite))
})

export default withRouter(connect(MSTP, MDTP)(Login))