import * as firebase from 'firebase';

export const getUserContent = id => {
  const db = firebase.database().ref().child(id);
  return db.once('value', snap => snap);
};

export const userContentToFirebase = (
  id, savedSpms, savedGenres, savedSeeds
) => {
  const spms = firebase.database().ref().child(id).child('savedSpms');
  spms.set(savedSpms);

  const genres = firebase.database().ref().child(id).child('savedGenres');
  genres.set(savedGenres);

  const seeds = firebase.database().ref().child(id).child('savedSeeds');
  seeds.set(savedSeeds);
};