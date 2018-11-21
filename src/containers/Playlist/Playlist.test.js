/* eslint-disable */
import React from 'react';
import { shallow } from 'enzyme';
import { savePlaylist } from '../../actions/actions';
import { Playlist, MSTP, MDTP } from './Playlist';
import * as apiCalls from '../../apiCalls';

jest.mock('../../apiCalls')

describe('Playlist', () => {
  let wrapper;
  let mockPlaylist = [{
    artist: 'I Fight Dragons',
    title: 'Dont You?',
    id: '1234abcd',
    uri: 'spotify:tracks:1234abcd'
  }]
  let mockNewSeed = {
    spm: 148,
    genre: 'ska'
  }
  let mockUser = {
    name: 'Alex',
    id: 'lxbndr'
  }
  let mockAccessToken = '12345abcde'

  beforeEach( ()=> {
    wrapper = shallow(<Playlist 
      playlist={mockPlaylist}
      newSeed={mockNewSeed}
      user={mockUser}
      accessToken={mockAccessToken}
    />)
  })

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  describe('componentDidMount', () => {
    it('should set the playlistName and trackUris into state on mount', () => {
      const mockState = {
        playlistName: 'Alex\'s 148 SPM, ska playlist',
        errorStatus: '',
        page: 2,
        selectedTracks: [],
      }
      expect(wrapper.state()).toEqual(mockState)
    })
  })

  describe('playlistToRender', () => {
    it('should match the snapshot', () => {
      expect(wrapper.instance().playlistToRender).toMatchSnapshot()
    })
  })

  describe('toggleSelectAll', () => {
    it('should match the snapshot when event.target.checked is true', () => {
      const mockEvent = {target: {checked: true}}

      expect(wrapper.instance().toggleSelectAll(mockEvent)).toMatchSnapshot()
    })

    it('should match the snapshot when event.target.checked is false', () => {
      const mockEvent = {target: {checked: false}}

      expect(wrapper.instance().toggleSelectAll(mockEvent)).toMatchSnapshot()
    })
  })

  describe('sendToSpotify', () => {
    it('should match the snapshot if the playlist is created in spotify', () => {
      expect(wrapper.instance().sendToSpotify()).toMatchSnapshot()
    })

    it('should call createNewPlaylist with a user ID, accessToken, and a playlist name', () => {
      wrapper.instance().sendToSpotify()
      expect(apiCalls.createNewPlaylist).toHaveBeenCalledWith('lxbndr', '12345abcde', 'Alex\'s 148 SPM, ska playlist')
    })

    it('should call populatePlaylist with a user ID, plylist ID, accessToken, and selectedSongs', () => {
      wrapper.instance().sendToSpotify()
      expect(apiCalls.populatePlaylist).toHaveBeenCalledWith('lxbndr', '12345abcde', '12345abcde', [])
    })

    it('should set the state of errorStatus to display an error if playlist creation fails', async () => {
      await wrapper.instance().sendToSpotify()
      expect(wrapper.state().errorStatus).not.toEqual('')
    })
  })

  // describe('changePlaylistName', () => {
  //   it('should set state of playlistName with whatever is in the input', () => {
  //     const mockEvent = {target: {value: 'Rock n Roll Son!'}}
  //     wrapper.instance().changePlaylistName(mockEvent)
  //     expect(wrapper.state().playlistName).toEqual('Rock n Roll Son!')
  //   })
  // })

  describe('getMoreSongs', () => {
    beforeEach(() => {
      // Mock user action of scrolling to bottom of page
      window.innerHeight = 0;
    })

    it('should call getPlaylistData with a spm, genre, accessToken, and limit of 40', async () => {
      await wrapper.instance().getMoreSongs()
      expect(apiCalls.getPlaylistData).toHaveBeenCalledWith(148, 'ska', '12345abcde', 40)
    })

    it('should call getPlaylistData with a spm, genre, accessToken, and limit of 60 when called twice', async () => {
      await wrapper.instance().getMoreSongs()
      await wrapper.instance().getMoreSongs()
      expect(apiCalls.getPlaylistData).toHaveBeenCalledWith(148, 'ska', '12345abcde', 60)
    })

    it('should increment the page in state', async () => {
      expect(wrapper.state().page).toEqual(2)
      await wrapper.instance().getMoreSongs()
      expect(wrapper.state().page).toEqual(3)
    })
  })

  describe('MSTP', () => {
    it('should return an object with values matching whatever is in state', () => {
      const mockState = {
        playlist: mockPlaylist,
        newSeed: mockNewSeed,
        user: mockUser,
        accessToken: mockAccessToken
      }
      const mapped = MSTP(mockState);

      expect(mapped.playlist).toEqual(mockPlaylist)
      expect(mapped.newSeed).toEqual(mockNewSeed)
      expect(mapped.user).toEqual(mockUser)
      expect(mapped.accessToken).toEqual(mockAccessToken)
    })
  })

  describe('MDTP', () => {
    it('should call dispatch when addToPlaylist is called', () => {
      const mockPlaylist = [{song: 'name'}]
      const mockDispatch = jest.fn();
      const result = MDTP(mockDispatch);
      result.savePlaylist(mockPlaylist);
      expect(mockDispatch).toHaveBeenCalledWith(savePlaylist(mockPlaylist))
    })
  })
})