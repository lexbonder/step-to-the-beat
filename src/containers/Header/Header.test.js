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
  let mockHistory = { push: jest.fn() }
  let mockLocation = { pathname: '/confirm'}
  window.localStorage = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn()
  }

  beforeEach(() => {
    mockLoggedIn = true
    wrapper = shallow(<Header 
      loggedIn={mockLoggedIn}
      user={mockUser}
      logOutUser={mockLogOutUser}
      clearAccessToken={mockClearAccessToken}
      history={mockHistory}
      location={mockLocation}
    />)
  })

  it('should have a default state', () => {
    expect(wrapper.state()).toEqual({menuOpen: 'hide'})
  })

  describe('While a user is logged in', () => {
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
        expect(mockClearAccessToken).toHaveBeenCalled()
      })
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
        history={mockHistory}
        location={mockLocation}
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

  describe('showLogOut', () => {
    it('should set menuOpen to show', () => {
      wrapper.instance().showLogOut()
      expect(wrapper.state().menuOpen).toEqual('show')
    })
  })

  describe('hideLogOut', () => {
    it('should set menuOpen to hide if it is set to show', () => {
      wrapper.instance().hideLogOut()
      expect(wrapper.state().menuOpen).toEqual('hide')
    })
  })

  describe('pageName', () => {
    it('should return Confirm when the pathname is /confirm', () => {
      expect(wrapper.instance().pageName()).toEqual('Confirm')
    })

    it('should return My Playilsts when the pathname is /saved-playlists', () => {
      const mockLocation = {pathname: '/saved-playlists'}
      const wrapper = shallow(<Header 
        loggedIn={mockLoggedIn}
        user={mockUser}
        logOutUser={mockLogOutUser}
        clearAccessToken={mockClearAccessToken}
        history={mockHistory}
        location={mockLocation}
      />)
      expect(wrapper.instance().pageName()).toEqual('My Playlists')
    })

    it('should return Steps Per Minute when the pathname is /select-spm', () => {
      const mockLocation = {pathname: '/select-spm'}
      const wrapper = shallow(<Header 
        loggedIn={mockLoggedIn}
        user={mockUser}
        logOutUser={mockLogOutUser}
        clearAccessToken={mockClearAccessToken}
        history={mockHistory}
        location={mockLocation}
      />)
      expect(wrapper.instance().pageName()).toEqual('Steps Per Minute')
    })

    it('should return Select Genre when the pathname is /select-genre', () => {
      const mockLocation = {pathname: '/select-genre'}
      const wrapper = shallow(<Header 
        loggedIn={mockLoggedIn}
        user={mockUser}
        logOutUser={mockLogOutUser}
        clearAccessToken={mockClearAccessToken}
        history={mockHistory}
        location={mockLocation}
      />)
      expect(wrapper.instance().pageName()).toEqual('Select Genre')
    })

    it('should return View Playlist when the pathname is /playlist', () => {
      const mockLocation = {pathname: '/playlist'}
      const wrapper = shallow(<Header 
        loggedIn={mockLoggedIn}
        user={mockUser}
        logOutUser={mockLogOutUser}
        clearAccessToken={mockClearAccessToken}
        history={mockHistory}
        location={mockLocation}
      />)
      expect(wrapper.instance().pageName()).toEqual('View Playlist')
    })

    it('should return an empty string by default', () => {
      const mockLocation = {pathname: '/nonsense'}
      const wrapper = shallow(<Header 
        loggedIn={mockLoggedIn}
        user={mockUser}
        logOutUser={mockLogOutUser}
        clearAccessToken={mockClearAccessToken}
        history={mockHistory}
        location={mockLocation}
      />)
      expect(wrapper.instance().pageName()).toEqual('')
    })
  })

  describe('handleLogOut', () => {
    it('should call logOutUser, clearAccessToken and reirect the user to / when called', () => {
      wrapper.instance().handleLogOut()

      expect(mockLogOutUser).toHaveBeenCalled()
      expect(mockClearAccessToken).toHaveBeenCalled()
      expect(mockHistory.push).toHaveBeenCalledWith('/')
    })
  })

    describe('handleHomeButton', () => {
    it('should redirect the user to /saved-playlists when called', () => {
      wrapper.instance().handleHomeButton()
      expect(mockHistory.push).toHaveBeenCalledWith('/saved-playlists')
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