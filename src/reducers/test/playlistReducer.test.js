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

  it('should remove an item from the playlist if the id matches and the type is REMOVE_FROM_PLAYLIST', () => {
    const mockState = [{
      artist: 'I Fight Dragons',
      title: 'Dont You?',
      id: '12345abcde',
      uri: 'spotify:track:12345abcde'
    }]

    const mockAction = {
      type: 'REMOVE_FROM_PLAYLIST',
      id: '12345abcde'
    }

    expect(playlistReducer(mockState, mockAction)).toEqual([])
  })
})