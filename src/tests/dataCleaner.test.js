/* eslint-disable */
import { playlistCleaner, userCleaner } from '../dataCleaner';

describe('playlistCleaner', () => {
  it('takes in a raw playlist and returns an object with artist title id and uri', () => {
    const mockRawPlaylist = [{
      artists: [{name: 'I Fight Dragons'}],
      name: 'Dont You?',
      id: '12345abcde',
      uri: 'spotify:track:12345abcde'
    }]

    const expected = [{
      artist: 'I Fight Dragons',
      title: 'Dont You?',
      id: '12345abcde',
      uri: 'spotify:track:12345abcde'
    }]

    expect(playlistCleaner(mockRawPlaylist)).toEqual(expected)
  })
})

describe('userCleaner', () => {
  it('takes in a rawUser object and returns a cleaned object', () => {
    const mockRawUser = {
      display_name: 'Alex Bonder',
      id: 'lxbndr',
      images: [{
        url: 'superlongurl'
      }]
    }
    const mockCleanedUser = {
      name: 'Alex',
      id: 'lxbndr',
      image: 'superlongurl'
    }

    expect(userCleaner(mockRawUser)).toEqual(mockCleanedUser)
  })

  it('should return default values if the user does not have a displayname or image', () => {
    const mockRawUser = {
      id: 'lxbndr',
      images: []
    }
    const mockCleanedUser = {
      name: 'lxbndr',
      id: 'lxbndr',
      image: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'
    }

    expect(userCleaner(mockRawUser)).toEqual(mockCleanedUser)
  })
})