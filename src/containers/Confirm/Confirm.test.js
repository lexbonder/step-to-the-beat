/* eslint-disable */
import React from 'react';
import { shallow } from 'enzyme';
import { Confirm, MSTP, MDTP } from './Confirm';
import { savePlaylist, saveRecentSeed } from '../../actions/actions'; 

jest.mock('../../apiCalls');
jest.mock('../../firebaseCalls');

describe('Confirm', () => {
  let wrapper
  let mockNewSeed = {spm: 148, genre: 'ska'}
  let mockUser = {name: 'Alex', id: 'lxbndr'}
  let mockRecentSpms = [148, 160]
  let mockRecentGenres = ['ska', 'rock']
  let mockRecentSeeds = [
    {spm: 148, genre: 'ska'},
    {spm: 160, genre: 'rock'}
  ]
  let mockAccessToken = '12345abcde'
  let mockSavePlaylist = jest.fn()
  let mockSaveRecentSeed = jest.fn()
  let mockHistory = {push: jest.fn()}

  beforeEach(() => {
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
      expect(mockSaveRecentSeed).toHaveBeenCalledWith({spm: 148, genre: 'ska'})
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

    it('redirects the user to /playlist', async () => {
      await wrapper.instance().getPlaylist()
      expect(mockHistory.push).toHaveBeenCalledWith('/playlist')
    })

    it('sets errorStatus in state if the fetch fails', async () => {
      await wrapper.instance().getPlaylist()
      expect(wrapper.state().errorStatus).toEqual('Failed to retrieve playlist')
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