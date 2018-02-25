import { playlistCleaner } from '../playlistCleaner';

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