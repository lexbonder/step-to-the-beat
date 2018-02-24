/* eslint-disable */
import clientId from './clientId';

const redirectUri = encodeURIComponent('http://localhost:3000/login');
// const redirectUri = encodeURIComponent('https://step-to-the-beat.firebaseapp.com/login');

export const authorize = () => {
  window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&scope=playlist-modify-public`;
};
