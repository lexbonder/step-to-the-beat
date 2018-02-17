import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { saveAccessToken, logInUser, saveUserName } from '../../actions/actions';
import { getUserName } from '../../apiCalls.js';

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
      const userName = await getUserName(this.props.accessToken)
      this.props.saveUserName(userName)
    }
    this.props.history.push('/')
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
  saveUserName: userName => dispatch(saveUserName(userName))
})

export default withRouter(connect(MSTP, MDTP)(Login))