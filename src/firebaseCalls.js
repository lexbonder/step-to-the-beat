import * as firebase from 'firebase';

export const getUserFavorites = id => {
  const db = firebase.database().ref().child(id)
  return db.once('value', snap => snap)
}

export const sendFavSongsToFirebase = (id, favoriteSongs) => {
  const db = firebase.database().ref().child(id).child('favoriteSongs')
  db.set(favoriteSongs)
}