/* eslint-disable */
import React from 'react';
import { shallow } from 'enzyme';
import { Confirm, MSTP, MDTP } from './Confirm';
import { savePlaylist, saveRecentSeed } from '../../actions/actions';
import * as firebaseCalls from '../../firebaseCalls'; 

jest.mock('../../apiCalls');
jest.mock('../../firebaseCalls');

describe('Confirm', () => {
  let wrapper
  let mockNewSeed = {spm: 148, genre: 'ska', id: 0}
  let mockUser = {name: 'Alex', id: 'lxbndr'}
  let mockRecentSpms = [148, 160]
  let mockRecentGenres = ['ska', 'rock']
  let mockRecentSeeds = [
    {spm: 148, genre: 'ska', id: 0},
  ]
  let mockAccessToken = '12345abcde'
  let mockSavePlaylist = jest.fn()
  let mockSaveRecentSeed = jest.fn()
  let mockHistory = {push: jest.fn()}

  beforeEach(() => {
    Date.now = jest.fn().mockImplementation(() => 0) 
    wrapper = shallow(<Confirm 
      newSeed={mockNewSeed}
      user={mockUser}
      recentSpms={mockRecentSpms}
      recentGenres={mockRecentGenres}
      recentSeeds={mockRecentSeeds}
      accessToken={mockAccessToken}
      savePlaylist={mockSavePlaylist}
      saveRecentSeed={mockSaveRecentSeed}
      history={mockHistory}
    />)
  })

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  describe('componentDidMount', () => {
    it('should call save recent seed with a newSeed object when the component mounts', () => {
      expect(mockSaveRecentSeed).toHaveBeenCalledWith({spm: 148, genre: 'ska', id: 0})
    })

    it('should set the genre and spm into state', () => {
      expect(wrapper.state().genre).toEqual('Ska')
      expect(wrapper.state().spm).toEqual(148)
    })

    it('should redirect the user to /saved-playlists if there is no new seed', () => {
      const mockNewSeed = {}

      const wrapper = shallow(<Confirm 
        newSeed={mockNewSeed}
        user={mockUser}
        recentSpms={mockRecentSpms}
        recentGenres={mockRecentGenres}
        recentSeeds={mockRecentSeeds}
        accessToken={mockAccessToken}
        savePlaylist={mockSavePlaylist}
        saveRecentSeed={mockSaveRecentSeed}
        history={mockHistory}
      />)
      expect(mockHistory.push).toHaveBeenCalledWith('/saved-playlists')
    })
  })

  describe('getPlaylist', () => {
    it('calls this.props.savePlaylist with a cleanedPlaylist Object', async () => {
      const mockCleanedPlaylist = [{
        artist: 'I fight Dragons',
        title: 'Dont you?',
        id: '12341234',
        uri: 'spotify:track:12341234'
      }]
      await wrapper.instance().getPlaylist()
      expect(mockSavePlaylist).toHaveBeenCalledWith(mockCleanedPlaylist)
    })

    it('calls seedToFirebase with a user ID and seed', async () => {
      const expected = ['lxbndr', {genre: 'ska', id: 0, spm: 148}]

      await wrapper.instance().getPlaylist()
      expect(firebaseCalls.seedToFirebase).toHaveBeenCalledWith(...expected)
    })

    it('calls userContentToFirebase with a userId, recentSpms, and recentGenres', async () => {
      const expected = ['lxbndr', [148, 160], ['ska', 'rock']]

      await wrapper.instance().getPlaylist()
      expect(firebaseCalls.userContentToFirebase).toHaveBeenCalledWith(...expected)
    })

    it('redirects the user to /playlist', async () => {
      await wrapper.instance().getPlaylist()
      expect(mockHistory.push).toHaveBeenCalledWith('/playlist')
    })

    it('sets errorStatus in state if the fetch fails', async () => {
      await wrapper.instance().getPlaylist()
      expect(wrapper.state().errorStatus).toEqual('Failed to retrieve playlist')
    })
  })

  describe('handleBackButton', () => {
    it('should redirect the user to /select-genre when called', () => {
      wrapper.instance().handleBackButton()
      expect(mockHistory.push).toHaveBeenCalledWith('/select-genre')
    })
  })

  describe('MSTP', () => {
    it('should return the values of the states from the store', () => {
      const mockState = {
        newSeed: {spm: 148, genre: 'ska'},
        user: {name: 'Alex', id: 'lxbndr'},
        recentSpms: [148, 160],
        recentGenres: ['ska', 'rock'],
        recentSeeds: [
          {spm: 148, genre: 'ska'},
          {spm: 160, genre: 'rock'}
        ],
        accessToken: '12345abcde'
      }
      const mapped = MSTP(mockState)

      expect(mapped.newSeed).toEqual({spm: 148, genre: 'ska'})
      expect(mapped.user).toEqual({name: 'Alex', id: 'lxbndr'})
      expect(mapped.recentSpms).toEqual([148, 160])
      expect(mapped.recentGenres).toEqual(['ska', 'rock'])
      expect(mapped.accessToken).toEqual('12345abcde')
      expect(mapped.recentSeeds).toEqual([
        {spm: 148, genre: 'ska'},
        {spm: 160, genre: 'rock'}
      ])
    })
  })

  describe('MDTP', () => {
    it('should call dispatch when the functions it mapps are called', () => {
      const mockDispatch = jest.fn()
      const mockPlaylist = [{
        artist: 'I fight Dragons',
        title: 'Dont you?',
        id: '12341234',
        uri: 'spotify:track:12341234'
      }]
      const mockSeed = {spm: 148, genre: 'ska'}
      const result = MDTP(mockDispatch)
      result.savePlaylist(mockPlaylist)
      result.saveRecentSeed(mockSeed)

      expect(mockDispatch).toHaveBeenCalledWith(savePlaylist(mockPlaylist))
      expect(mockDispatch).toHaveBeenCalledWith(saveRecentSeed(mockSeed))
    })
  })
})