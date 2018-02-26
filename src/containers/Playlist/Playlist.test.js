/* eslint-disable */
import React from 'react';
import { shallow } from 'enzyme';
import { Playlist, MSTP } from './Playlist';

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
        playlistResponse: '',
        errorStatus: '',
        trackUris: ['spotify:tracks:1234abcd']
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
    it('should set the state of playlistResponse to be a success message if the playlist is created in spotify', async () => {
      await wrapper.instance().sendToSpotify()
      expect(wrapper.state().playlistResponse).toEqual(`Alex's 148 SPM, ska playlist created successfully`)
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
})