/* eslint-disable */
import React from 'react';
import { shallow } from 'enzyme';
import { SavedPlaylist, MSTP, MDTP } from './SavedPlaylist';
import { savePlaylist, selectSeed } from '../../actions/actions';

jest.mock('../../apiCalls')

describe('SavedPlaylist', () => {
  let wrapper;
  let mockSeed = {spm: 148, genre: 'ska'}
  let mockUser = {name: 'Alex', id: 'lxbndr', image: 'superlongurl'}
  let mockAccessToken = '12345abcde';
  let mockSavePlaylist = jest.fn()
  let mockSelectSeed = jest.fn()
  let mockHistory = { push: jest.fn() }

  beforeEach(() => {
    wrapper = shallow(<SavedPlaylist
      user={mockUser}
      seed={mockSeed} 
      accessToken={mockAccessToken}
      savePlaylist={mockSavePlaylist}
      selectSeed={mockSelectSeed}
      history={mockHistory} 
    />)
  })

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  describe('componentDidMount', () => {
    it('should set genre playlistName and spm after mounting', () => {
      const expectedState = {
        errorState: '',
        genre: 'ska',
        playlistName: `Alex's 148 SPM, ska playlist`,
        spm: 148,
      }
      expect(wrapper.state()).toEqual(expectedState)
    })
  })

  describe('handleClick', () => {
    it('should call savePlaylist with a cleaned playlist object', async () => {
      const mockCleanedPlaylist = [{
        artist: "I fight Dragons",
        id: "12341234",
        title: "Dont you?",
        uri: "spotify:track:12341234"
      }]
      await wrapper.instance().handleClick()
      expect(mockSavePlaylist).toHaveBeenCalledWith(mockCleanedPlaylist)
    })

    it('should call selectSeed with a seed object', async () => {
      await wrapper.instance().handleClick()
      expect(mockSelectSeed).toHaveBeenCalledWith(mockSeed)
    })

    it('should redirect the user to /playlist', async () => {
      await wrapper.instance().handleClick()
      expect(mockHistory.push).toHaveBeenCalledWith('/playlist')
    })

    it('should set an error message into state if the fetch is unsuccessful', async () => {
      await wrapper.instance().handleClick()
      await wrapper.instance().handleClick()
      expect(wrapper.state().errorState).not.toEqual('')
    })
  })

  describe('MSTP', () => {
    it('should return an object with the values it gets from state', () => {
      const mockState = {
        accessToken: mockAccessToken,
        user: {
          name: 'Alex',
          id: 'lxbndr',
          image: 'superlongurl'
        }
      }

      const mapped = MSTP(mockState)

      expect(mapped.accessToken).toEqual(mockAccessToken)
      expect(mapped.user).toEqual(mockUser)
    })
  })

  describe('MDTP', () => {
    let mockDispatch = jest.fn()
    let result;

    beforeEach(() => {
      result = MDTP(mockDispatch)
    })

    it('should call dispatch when savePlaylist is called', () => {
      const mockPlaylist = [{
        artist: "I fight Dragons",
        id: "12341234",
        title: "Dont you?",
        uri: "spotify:track:12341234"
      }]

      result.savePlaylist(mockPlaylist)
      expect(mockDispatch).toHaveBeenCalledWith(savePlaylist(mockPlaylist))
    })

    it('should call dispatch when selectSeed is called', () => {
      result.selectSeed(mockSeed)
      expect(mockDispatch).toHaveBeenCalledWith(selectSeed(mockSeed))
    })
  })
})