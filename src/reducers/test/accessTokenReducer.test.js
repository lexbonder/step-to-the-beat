import { accessTokenReducer } from '../accessTokenReducer';

describe('accessTokenReducer', () => {
  it('should return state by default', () => {
    expect(accessTokenReducer(undefined, {})).toEqual('')
  })

  it('should return the token when the action type is SAVE_ACCESS_TOKEN', () => {
    const mockAction = {
      type: 'SAVE_ACCESS_TOKEN',
      token: 'OhhWowMuchTokenSoSecurity'
    }
    expect(accessTokenReducer(undefined, mockAction)).toEqual('OhhWowMuchTokenSoSecurity')
  })

  it('should clear the state when the action type is CLEAR_ACCESS_TOKEN', () => {
    const mockAction = {
      type: 'CLEAR_ACCESS_TOKEN'
    }
    expect(accessTokenReducer('OhhWowMuchTokenSoSecurity', mockAction)).toEqual('')
  })
})