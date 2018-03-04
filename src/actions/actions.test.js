/* eslint-disable */
import * as actions from './actions';

describe('Actions', () => {
  describe('AccessTokenReducer actions', () => {
    it('saveAccessToken should return an object with the type SAVE_ACCESS_TOKEN and a token', () => {
      const mockToken = 'OhhWowMuchTokenSoSecurity';
      const expected = {
        type: 'SAVE_ACCESS_TOKEN',
        token: mockToken
      }

      expect(actions.saveAccessToken(mockToken)).toEqual(expected)
    })

    it('clearAccessToken should return an object with the type CLEAR_ACCESS_TOKEN', () => {
      const expected = {type: 'CLEAR_ACCESS_TOKEN'}

      expect(actions.clearAccessToken()).toEqual(expected)
    })
  })

  describe('LoggedInReducer actions', () => {
    it('logInUser should return an object with the type LOG_IN_USER, and a loggedIn value of true', () => {
      const expected = {
        type: 'LOG_IN_USER',
        loggedIn: true
      }

      expect(actions.logInUser()).toEqual(expected)
    })

    it('logOutUser should return an object with the type LOG_OUT_USER, and a loggedIn value of false', () => {
      const expected = {
        type: 'LOG_OUT_USER',
        loggedIn: false
      }

      expect(actions.logOutUser()).toEqual(expected)
    })
  })

  describe('UserReducer actions', () => {
    it('saveUser should return an object with the type SAVE_USER and a user object', () => {
      const user = {name: 'Alex', id: 'lxbndr'}
      const expected = {
        type: 'SAVE_USER',
        user
      }

      expect(actions.saveUser(user)).toEqual(expected)
    })
  })

  describe('newSeedReducer', () => {
    it('select spm should return an object with the type SELECT_SPM and an spm object', () => {
      const spm = 100
      const expected = {
        type: 'SELECT_SPM',
        spm
      }
      
      expect(actions.selectSpm(spm)).toEqual(expected)
    })

    it('select genre should return an object with the type SELECT_GENRE and a genre object', () => {
      const genre = 'ska'
      const expected = {
        type: 'SELECT_GENRE',
        genre
      }

      expect(actions.selectGenre(genre)).toEqual(expected)
    })

    it('selectSeed should return an object with the type SELECT_SEED and a seed object', () => {
      const seed = {spm: 148, genre: 'ska'}
      const expected = {
        type: 'SELECT_SEED',
        seed
      }

      expect(actions.selectSeed(seed)).toEqual(expected)
    })
  })

  describe('recentSpmReducer', () => {
    it('saveRecentSpm should return an object with the type SAVE_RECENT_SPM and an spm object', () => {
      const spm = 148
      const expected = {
        type: 'SAVE_RECENT_SPM',
        spm
      }

      expect(actions.saveRecentSpm(spm)).toEqual(expected)
    })

    it('spmsFromFirebase should return an object with the type SPMS_FROM_FIREBASE and an spms object', () => {
      const spms = [148, 160]
      const expected = {
        type: 'SPMS_FROM_FIREBASE',
        spms
      }

      expect(actions.spmsFromFirebase(spms)).toEqual(expected)
    })
  })

  describe('recentGenreReducer', () => {
    it('saveRecentGenre should return an object with the type SAVE_RECENT_GENRE and a genre object', () => {
      const genre = 'ska'
      const expected = {
        type: 'SAVE_RECENT_GENRE',
        genre
      }

      expect(actions.saveRecentGenre(genre)).toEqual(expected)
    })

    it('genresFromFirebase should return an object with the type GENRES_FROM_FIREBASE and an genres object', () => {
      const genres = ['ska', 'rock']
      const expected = {
        type: 'GENRES_FROM_FIREBASE',
        genres
      }

      expect(actions.genresFromFirebase(genres)).toEqual(expected)
    })
  })

  describe('recentSeedReducer', () => {
    it('saveRecentSeed should return an object with the type SAVE_RECENT_SEED and a seed object', () => {
      const seed = {spm: 148, genre: 'ska', id: 5}
      const expected = {
        type: 'SAVE_RECENT_SEED',
        seed
      }
      
      expect(actions.saveRecentSeed(seed)).toEqual(expected)
    })

    it('deleteSeed should return an object with the type DELETE_SEED and an id', () => {
      const id = 12345;
      const expected = {
        type: 'DELETE_SEED',
        id
      }

      expect(actions.deleteSeed(id)).toEqual(expected)
    })

    it('seedsFromFirebase should return an object with the type SEEDS_FROM_FIREBASE and an seeds object', () => {
      const seeds = [
        {spm: 148, genre: 'ska'},
        {spm: 160, genre: 'rock'},
      ]
      const expected = {
        type: 'SEEDS_FROM_FIREBASE',
        seeds
      }

      expect(actions.seedsFromFirebase(seeds)).toEqual(expected)
    })
  })

  describe('playlistReducer', () => {
    it('savePlaylist should return an object with the type SAVE_PLAYLIST and a playlist object', () => {
      const playlist = [{
        artist: 'I Fight Dragons',
        title: 'Dont You?',
        id: '12341234',
        uri: 'spotify:tracks:12341234'
      }]
      const expected = {
        type: 'SAVE_PLAYLIST',
        playlist
      }

      expect(actions.savePlaylist(playlist)).toEqual(expected)
    })
  })
})
