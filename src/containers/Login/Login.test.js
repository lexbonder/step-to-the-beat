/* eslint-disable */
import React from 'react';
import { shallow } from 'enzyme';
import { Login, MSTP, MDTP } from './Login';
import { saveAccessToken, logInUser, saveUser, seedsFromFirebase, genresFromFirebase, spmsFromFirebase } from '../../actions/actions';

jest.mock('../../apiCalls')
jest.mock('../../firebaseCalls')

describe('Login', () => {
  let wrapper;
  let mockAccessToken = '12345abcde'
  let mockSaveAccessToken = jest.fn()
  let mockLogInUser = jest.fn()
  let mockSaveUser = jest.fn()
  let mockSeedsFromFirebase = jest.fn()
  let mockGenresFromFirebase = jest.fn()
  let mockSpmsFromFirebase = jest.fn()
  let mockLocation = {hash: '#token=0123456789&nonsense=abcdefg'}
  let mockHistory = {push: jest.fn()}

  beforeEach(() => {
    wrapper = shallow(<Login 
      accessToken={mockAccessToken}
      saveAccessToken={mockSaveAccessToken}
      logInUser={mockLogInUser}
      saveUser={mockSaveUser}
      seedsFromFirebase={mockSeedsFromFirebase}
      genresFromFirebase={mockGenresFromFirebase}
      spmsFromFirebase={mockSpmsFromFirebase}
      location={mockLocation}
      history={mockHistory}
    />)
  })

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  describe('componentDidMount', () => {
    it('should call save accessToken with the value it recives from the hash', () => {
      expect(mockSaveAccessToken).toHaveBeenCalledWith('0123456789')
    })

    it('should call logInUser', () => {
      expect(mockLogInUser).toHaveBeenCalled()
    })

    describe('if a hash is not provided', () => {
      let mockLocation;
      let wrapper;

      beforeEach(() => {
        window.alert = jest.fn()
        mockLocation = {hash: ''}

        wrapper = shallow(<Login 
          accessToken={mockAccessToken}
          saveAccessToken={mockSaveAccessToken}
          logInUser={mockLogInUser}
          saveUser={mockSaveUser}
          seedsFromFirebase={mockSeedsFromFirebase}
          genresFromFirebase={mockGenresFromFirebase}
          spmsFromFirebase={mockSpmsFromFirebase}
          location={mockLocation}
          history={mockHistory}
        />)
      })

      it('should call the alert method', () => {
        expect(window.alert).toHaveBeenCalled()
      })

      it('should redirect the user to / ', () => {
        expect(mockHistory.push).toHaveBeenCalledWith('/')
      })
    })
  })

  describe('componentDidUpdate', () => {
    it('should redirect the user to /select-spm if firebase doesnt return any data', async () => {
      await wrapper.instance().componentDidUpdate()
      expect(mockHistory.push).toHaveBeenCalledWith('/select-spm')
    })
    
    it('should redirect the user to /saved-playlists if firebase returns data', async () => {
      await wrapper.instance().componentDidUpdate()
      expect(mockHistory.push).toHaveBeenCalledWith('/saved-playlists')
    })

    it('should call seedsFromFirebase with a seeds object if firebase returns data', async () => {
      const mockSeeds = [
        {spm: 148, genre:'ska'}, 
        {spm: 160, genre:'rock'}
      ]

      await wrapper.instance().componentDidUpdate()
      expect(mockSeedsFromFirebase).toHaveBeenCalledWith(mockSeeds)
    })

    it('should call genresFromFirebase with a genre object if firebase returns data', async () => {
      const mockGenres = ['ska', 'rock']

      await wrapper.instance().componentDidUpdate()
      expect(mockGenresFromFirebase).toHaveBeenCalledWith(mockGenres)
    })

    it('should call spmsFromFirebase with an spms object if firebase returns data', async () => {
      const mockSpms = [148, 160]

      await wrapper.instance().componentDidUpdate()
      expect(mockSpmsFromFirebase).toHaveBeenCalledWith(mockSpms)
    })

    it('should call saveUser with a userObject', async () => {
      await wrapper.instance().componentDidUpdate()
      expect(mockSaveUser).toHaveBeenCalledWith({name: 'Alex', id: 'lxbndr'})
    })
  })

  describe('MSTP', () => {
    it('should return an object with the value it gets from state', () => {
      const mockState = {accessToken: '12345abcde'}
      const expected = '12345abcde'
      const mapped = MSTP(mockState)

      expect(mapped.accessToken).toEqual('12345abcde')
    })
  })

  describe('MDTP', () => {
    let mockDispatch
    let result;

    beforeEach(() => {
      mockDispatch = jest.fn()
      result = MDTP(mockDispatch)
    })

    it('should call dispatch when saveAccessToken is called', () => {
      const mockAccessToken = '12345abcde'
      result.saveAccessToken(mockAccessToken)

      expect(mockDispatch).toHaveBeenCalledWith(saveAccessToken(mockAccessToken))
    })

    it('should call dispatch when logInUser is called', () => {
      result.logInUser()

      expect(mockDispatch).toHaveBeenCalled()
    })

    it('should call dispatch when saveUser is called', () => {
      const mockUser = {name: 'Alex', id: 'lxbndr'}
      result.saveUser(mockUser)

      expect(mockDispatch).toHaveBeenCalledWith(saveUser(mockUser))
    })

    it('should call dispatch when seedsFromFirebase is called', () => {
      const mockSeeds = [
        {spm: 148, genre:'ska'}, 
        {spm: 160, genre:'rock'}
      ]
      result.seedsFromFirebase(mockSeeds)

      expect(mockDispatch).toHaveBeenCalledWith(seedsFromFirebase(mockSeeds))
    })

    it('should call dispatch when genresFromFirebase is called', () => {
      const mockGenres = ['ska', 'rock']
      result.genresFromFirebase(mockGenres)

      expect(mockDispatch).toHaveBeenCalledWith(genresFromFirebase(mockGenres))
    })

    it('should call dispatch when spmsFromFirebase is called', () => {
      const mockSpms = [148, 160]
      result.spmsFromFirebase(mockSpms)

      expect(mockDispatch).toHaveBeenCalledWith(spmsFromFirebase(mockSpms))
    })
  })
})