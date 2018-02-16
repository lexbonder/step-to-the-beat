import clientId from './clientId';
import Spotify from 'spotify-web-api-js';

const redirectUri = encodeURIComponent('http://localhost:3000/login');

const s = new Spotify();

export const authorize = () => {
  window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token`;
}
