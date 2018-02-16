import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { saveAccessToken, logInUser } from '../../actions/actions';

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
    this.props.history.push('/')
  }

  render () {
    return(
      <div></div>
    )
  }
}

export const MDTP = (dispatch) => ({
  saveAccessToken: (accessToken) => dispatch(saveAccessToken(accessToken)),
  logInUser: () => dispatch(logInUser())
})

export default withRouter(connect(null, MDTP)(Login))