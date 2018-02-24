/* eslint-disable */
import React from 'react';
import { shallow } from 'enzyme';
import { Playlist, MSTP } from './Playlist';

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