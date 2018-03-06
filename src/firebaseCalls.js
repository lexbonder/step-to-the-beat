import * as firebase from 'firebase';

export const getUserContent = id => {
  const db = firebase.database().ref().child(id);
  return db.once('value', snap => snap);
};

export const userContentToFirebase = (
  id, savedSpms, savedGenres
) => {
  const spms = firebase.database().ref().child(id).child('savedSpms');
  spms.set(savedSpms);

  const genres = firebase.database().ref().child(id).child('savedGenres');
  genres.set(savedGenres);
};

export const seedToFirebase = (id, seed) => {
  const seedToSave = firebase
    .database()
    .ref()
    .child(id)
    .child('savedSeeds')
    .child(seed.id);
  seedToSave.set(seed);
};

export const deleteFirebaseSeed = (userId, seedId) => {
  const seedToDelete = firebase
    .database()
    .ref()
    .child(userId)
    .child('savedSeeds')
    .child(seedId);
  seedToDelete.remove();
};