import { loggedInReducer } from '../loggedInReducer';

describe('loggedInReducer', () => {
  it('should return false by default', () => {
    expect(loggedInReducer(undefined, {})).toEqual(false)
  })

  it('should return true if the action type is LOG_IN_USER', () => {
    const mockAction = {
      type: 'LOG_IN_USER',
      loggedIn: true
    }
    expect(loggedInReducer(undefined, mockAction)).toEqual(true)
  })

  it('should return false if the action type is LOG_OUT_USER', () => {
    const mockAction = {
      type: 'LOG_OUT_USER',
      loggedIn: false
    }
    expect(loggedInReducer(true, mockAction)).toEqual(false)
  })
})