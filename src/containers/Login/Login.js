import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { 
  saveAccessToken,
  logInUser,
  saveUser,
  seedsFromFirebase,
  genresFromFirebase,
  spmsFromFirebase
} from '../../actions/actions';
import { getUserName } from '../../apiCalls.js';
import { getUserContent } from '../../firebaseCalls';

export class Login extends Component {

  componentDidMount = () => {
    const { location, history, saveAccessToken, logInUser } = this.props;
    if ( location.hash ) {
      const fullHash = location.hash.substr(1)
      const accessToken = fullHash.split('&')[0].split('=')[1]
      saveAccessToken(accessToken)
      logInUser()
    } else {
      alert('You were not signed in')
      history.push('/')
    }
  }

  componentDidUpdate = async () => {
    const { accessToken, history } = this.props
    const user = await getUserName(accessToken)
    const userContent = await getUserContent(user.id)
    this.props.saveUser(user)
    if (!userContent.val()) {
      history.push('/select-spm')
    } else {
      const { savedGenres, savedSeeds, savedSpms} = userContent.val()
      this.props.seedsFromFirebase(savedSeeds)
      this.props.genresFromFirebase(savedGenres)
      this.props.spmsFromFirebase(savedSpms)
      history.push('/saved-playlists')
    }
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
  seedsFromFirebase: seeds => dispatch(seedsFromFirebase(seeds)),
  genresFromFirebase: genres => dispatch(genresFromFirebase(genres)),
  spmsFromFirebase: spms => dispatch(spmsFromFirebase(spms))
})

export default withRouter(connect(MSTP, MDTP)(Login))