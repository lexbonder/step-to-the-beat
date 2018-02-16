import * as actions from './actions';

describe('Actions', () => {
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
