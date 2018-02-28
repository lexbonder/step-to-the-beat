import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { userCleaner } from '../../dataCleaner';
import { 
  saveAccessToken,
  logInUser,
  saveUser,
  seedsFromFirebase,
  genresFromFirebase,
  spmsFromFirebase
} from '../../actions/actions';
import LoadingGif from '../../components/LoadingGif/LoadingGif';
import { getUserName } from '../../apiCalls.js';
import { getUserContent } from '../../firebaseCalls';
import PropTypes from 'prop-types';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: ''
    };
  }

  componentDidMount = () => {
    const { location, history, saveAccessToken, logInUser } = this.props;
    if ( location.hash ) {
      const fullHash = location.hash.substr(1);
      const accessToken = fullHash.split('&')[0].split('=')[1];
      saveAccessToken(accessToken);
      logInUser();
    } else {
      alert('You were not signed in');
      history.push('/');
    }
  }

  componentDidUpdate = async () => {
    const { accessToken } = this.props;
    try {
      const rawUser = await getUserName(accessToken);
      const user = userCleaner(rawUser);
      this.props.saveUser(user);
      this.getContentFromFirebase(user.id);
      this.saveUserInLocal(user, accessToken);
    } catch (error) {
      this.setState({errorMessage: error.message});
    }
  }

  saveUserInLocal = (user, accessToken) => {
    const currentUser = {user, accessToken};
    const stringified = JSON.stringify(currentUser);
    localStorage.setItem('currentUser', stringified);
  }

  getContentFromFirebase = async (userId) => {
    try {
      const userContent = await getUserContent(userId);
      this.redirectUser(userContent);
    } catch (error) {
      this.setState({errorMessage: error.message});
    }
  }

  redirectUser = (userContent) => {
    const { 
      history,
      seedsFromFirebase,
      genresFromFirebase,
      spmsFromFirebase
    } = this.props;
    if (!userContent.val()) {
      history.push('/select-spm');
    } else {
      const { savedGenres, savedSeeds, savedSpms} = userContent.val();
      seedsFromFirebase(savedSeeds);
      genresFromFirebase(savedGenres);
      spmsFromFirebase(savedSpms);
      history.push('/saved-playlists');
    } 
  }

  render () {
    return (
      <div>
        <LoadingGif />
        {this.state.errorMessage}
      </div>
    );
  }
}

const { string, func, object } = PropTypes;

Login.propTypes = {
  accessToken: string,
  saveAccessToken: func,
  logInUser: func,
  saveUser: func,
  seedsFromFirebase: func,
  genresFromFirebase: func,
  spmsFromFirebase: func,
  location: object,
  history: object
};

export const MSTP = ({accessToken}) => ({accessToken});

export const MDTP = dispatch => ({
  saveAccessToken: accessToken => dispatch(saveAccessToken(accessToken)),
  logInUser: () => dispatch(logInUser()),
  saveUser: user => dispatch(saveUser(user)),
  seedsFromFirebase: seeds => dispatch(seedsFromFirebase(seeds)),
  genresFromFirebase: genres => dispatch(genresFromFirebase(genres)),
  spmsFromFirebase: spms => dispatch(spmsFromFirebase(spms))
});

export default withRouter(connect(MSTP, MDTP)(Login));