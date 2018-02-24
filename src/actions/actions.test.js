/* eslint-disable */
import * as actions from './actions';

describe('Actions', () => {
  describe('AccessTokenReducer actions', () => {
    it.skip('saveAccessToken should return an object with the type SAVE_ACCESS_TOKEN and a token', () => {
      const mockToken = 'OhhWowMuchTokenSoSecurity';
      const expected = {
        type: 'SAVE_ACCESS_TOKEN',
        token: mockToken
      }

      expect(actions.saveAccessToken(mockToken)).toEqual(expected)
    })

    it.skip('clearAccessToken should return an object with the type CLEAR_ACCESS_TOKEN', () => {
      const expected = {type: 'CLEAR_ACCESS_TOKEN'}

      expect(actions.clearAccessToken()).toEqual(expected)
    })
  })

  describe('LoggedInReducer actions', () => {
    it.skip('logInUser should return an object with the type LOG_IN_USER, and a loggedIn value of true', () => {
      const expected = {
        type: 'LOG_IN_USER',
        loggedIn: true
      }

      expect(actions.logInUser()).toEqual(expected)
    })

    it.skip('logOutUser should return an object with the type LOG_OUT_USER, and a loggedIn value of false', () => {
      const expected = {
        type: 'LOG_OUT_USER',
        loggedIn: false
      }

      expect(actions.logOutUser()).toEqual(expected)
    })
  })

  describe('UserReducer actions', () => {
    it.skip('saveUser should return an object with the type SAVE_USER and a user object', () => {
      const user = {name: 'Alex', id: 'lxbndr'}
      const expected = {
        type: 'SAVE_USER',
        user
      }

      expect(actions.saveUser(user)).toEqual(expected)
    })
  })

  describe('newSeedReducer', () => {
    it.skip('select spm should return an object with the type SELECT_SPM and an spm object', () => {
      const spm = 100
      const expected = {
        type: 'SELECT_SPM',
        spm
      }
      
      expect(actions.selectSpm(spm)).toEqual(expected)
    })
  })

})
