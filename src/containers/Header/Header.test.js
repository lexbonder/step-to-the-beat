/* eslint-disable */
import React from 'react';
import { shallow } from 'enzyme';
import { Header, MSTP, MDTP } from './Header';
import { logOutUser, clearAccessToken } from '../../actions/actions';

describe('Header', () => {
  let wrapper;
  let mockLoggedIn;
  let mockUser = {name: 'Alex', id: 'lxbndr'}
  let mockLogOutUser = jest.fn()
  let mockClearAccessToken = jest.fn()

  describe('While a user is logged in', () => {

    beforeEach(() => {
      mockLoggedIn = true
      wrapper = shallow(<Header 
        loggedIn={mockLoggedIn}
        user={mockUser}
        logOutUser={mockLogOutUser}
        clearAccessToken={mockClearAccessToken}
      />)
    })

    it('should match the snapshot', () => {
      expect(wrapper).toMatchSnapshot()
    })
    
    describe('userGreeting', () => {
      it('should match the snapshot if a user is logged in', () => {
        expect(wrapper.instance().userGreeting()).toMatchSnapshot()
      })

      it('should call logOutUser and clearAccessToken when a user clicks the LogOut link', () => {
        wrapper.find('.log-out').simulate('click')

        expect(mockLogOutUser).toHaveBeenCalled()
        expect(mockClearAccessToken).toHaveBeenCalled()      })
        // wrapper.instance().handleLogOut = jest.fn()
        // expect(wrapper.instance().handleLogOut).toHaveBeenCalled()
    })
  
  })

  describe('While a user is not logged in', () => {
    beforeEach(() => {
      mockLoggedIn = false
      wrapper = shallow(<Header 
        loggedIn={mockLoggedIn}
        user={mockUser}
        logOutUser={mockLogOutUser}
        clearAccessToken={mockClearAccessToken}
      />)
    })

    it('should match the snapshot', () => {
      expect(wrapper).toMatchSnapshot()
    })

    describe('userGreeting', () => {
      it('should return undefined', () => {
        expect(wrapper.instance().userGreeting()).toEqual(undefined)
      })
    })

  })

  describe('handleLogOut', () => {
    it('should call logOutUser and clearAccessToken when called', () => {
      wrapper.instance().handleLogOut()

      expect(mockLogOutUser).toHaveBeenCalled()
      expect(mockClearAccessToken).toHaveBeenCalled()
    })
  })

  describe('MSTP', () => {
    it('should return an object with the values stored in state', () => {
      const mockState = {
        loggedIn: true,
        user: {name: 'Alex', id: 'lxbndr'}
      }
      const mapped = MSTP(mockState)

      expect(mapped.loggedIn).toEqual(true)
      expect(mapped.user).toEqual({name: 'Alex', id: 'lxbndr'})
    })
  })

  describe('MDTP', () => {
    it('should call dispatch when one of MDTPs funcitons are called',() => {
      const mockDispatch = jest.fn()
      const result = MDTP(mockDispatch)
      result.logOutUser()
      result.clearAccessToken()

      expect(mockDispatch).toHaveBeenCalledWith(logOutUser())
      expect(mockDispatch).toHaveBeenCalledWith(clearAccessToken())
    })
  })

})