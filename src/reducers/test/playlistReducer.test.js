/* eslint-disable */
import { playlistReducer } from '../playlistReducer';

describe('playlistReducer', () => {
  it('should return an empty array by default', () => {
    expect(playlistReducer(undefined, {})).toEqual([])
  })

  it('should return a playlist when the type is SAVE_PLAYLIST', () => {
    const mockPlaylist = [{
      artist: 'I Fight Dragons',
      title: 'Dont You?',
      id: '12345abcde',
      uri: 'spotify:track:12345abcde'
    }]
    const mockAction = {
      type: 'SAVE_PLAYLIST',
      playlist: mockPlaylist
    }

    expect(playlistReducer(undefined, mockAction)).toEqual(mockPlaylist)
  })

  it('should add more tracks into the existing playlist when the type is ADD_TO_PLAYLIST', () => {
    const mockState = [{
      artist: 'I Fight Dragons',
      title: 'Dont You?',
      id: '12345abcde',
      uri: 'spotify:track:12345abcde'
    }]
    const mockPlaylist = [{
      artist: 'a',
      title: 'b',
      id: '1a',
      uri: 'spotify:track:1a'
    }]
    const mockAction = {
      type: 'ADD_TO_PLAYLIST',
      playlist: mockPlaylist
    }
    const expected = [
      {
        artist: 'I Fight Dragons',
        title: 'Dont You?',
        id: '12345abcde',
        uri: 'spotify:track:12345abcde'
      },
      {
        artist: 'a',
        title: 'b',
        id: '1a',
        uri: 'spotify:track:1a'
      }
    ];

    expect(playlistReducer(mockState, mockAction)).toEqual(expected)
  })
})