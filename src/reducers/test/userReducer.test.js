import { userReducer } from '../userReducer';

describe('userReducer', () => {
  it('should return an empty object by default', () => {
    expect(userReducer(undefined, {})).toEqual({})
  })

  it('should return a user object if the type is SAVE_USER', () => {
    const mockUser = {name: 'Alex', id: 'lxbndr'}
    const mockAction = {
      type: 'SAVE_USER',
      user: mockUser
    }

    expect(userReducer(undefined, mockAction)).toEqual(mockUser)
  })
})