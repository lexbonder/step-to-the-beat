/* eslint-disable */
import {getUserName, getPlaylistData, createNewPlaylist, populatePlaylist} from '../apiCalls';

describe('getUserName', () => {
  beforeEach(() => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      status: 200,
      json: () => Promise.resolve({
        display_name: 'Alex Bonder',
        id: 'lxbndr',
        images: [{url:'superlongurl'}]
      })
    }))
  })

  it('should be called with the right params', async () => {
    const mockAccessToken = '12345abcde';
    const expected = [
      'https://api.spotify.com/v1/me',
      { headers: {
        Authorization: 'Bearer ' + mockAccessToken
      }}
    ]

    getUserName(mockAccessToken)
    expect(window.fetch).toHaveBeenCalledWith(...expected)
  })

  it('returns an object if the status is ok', async () => {
    const mockAccessToken = '12345abcde';
    const mockRawUser = {
    display_name: 'Alex Bonder',
    id: 'lxbndr',
    images: [{
      url: 'superlongurl'}
    ]}
    expect(getUserName(mockAccessToken)).resolves.toEqual(mockRawUser)
  })

  it('throws an error if status code is not ok', async () => {
    const mockAccessToken = '12345abcde';
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        status: 500
      })
    )

    expect(getUserName(mockAccessToken)).rejects.toEqual(Error('Failed to get User Name'))
  })
})

describe('getPlaylistData', () => {
  beforeEach(() => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      status: 200,
      json: () => Promise.resolve([{
        artists:[{name: 'I Fight Dragons'}],
        id: '12341234',
        name: 'Dont You?',
        uri: 'spotify:track:12341234'
      }])
    }))
  })

  it('should be called with the right params', async () => {
    const mockGenre = 'ska'
    const mockBpm = 148
    const mockAccessToken = '12345abcde'

    const expected = [`https://api.spotify.com/v1/recommendations?seed_genres=${mockGenre}&target_tempo=${mockBpm}`,
      { headers: { Authorization: 'Bearer ' + mockAccessToken }}
    ]

    getPlaylistData(mockBpm, mockGenre, mockAccessToken)
    expect(window.fetch).toHaveBeenCalledWith(...expected)
  })

  it('returns an object if the status is ok', async () => {
    const mockGenre = 'ska'
    const mockBpm = 148
    const mockAccessToken = '12345abcde'

    const expected = [{
        artists:[{name: 'I Fight Dragons'}],
        id: '12341234',
        name: 'Dont You?',
        uri: 'spotify:track:12341234'
      }]

    expect(getPlaylistData(mockBpm, mockGenre, mockAccessToken)).resolves.toEqual(expected)
  })

  it('throws an error if the status code is not ok', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      status: 500
    }))

    expect(getPlaylistData()).rejects.toEqual(Error('Failed to Retrieve Playlist Data'))
  })
})

describe('createNewPlaylist', () => {
  beforeEach(() => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      status: 200,
      json: () => Promise.resolve({
        id: '12345abcde'
      })
    }))
  })

  it('should be called with the right params', async () => {
    const mockUserId = 'lxbndr'
    const mockAccessToken = '12345abcde'
    const mockPlaylistName = 'Mock Playlist'

    const mockPlaylistBody = {
      name: `${mockPlaylistName} (Step to the Beat)`
    }

    const expected = [`https://api.spotify.com/v1/users/${mockUserId}/playlists`, {
      method: 'POST',
      body: JSON.stringify(mockPlaylistBody),
      headers: {
        Authorization: 'Bearer ' + mockAccessToken,
        'Content-Type': 'application/json'
      }
    }]

    createNewPlaylist(mockUserId, mockAccessToken, mockPlaylistName)

    expect(window.fetch).toHaveBeenCalledWith(...expected)
  })

  it('returns an object if the status is ok', async () => {
    const mockUserId = 'lxbndr'
    const mockAccessToken = '12345abcde'
    const mockPlaylistName = 'Mock Playlist'

    const expected = {
      playlistId: '12345abcde',
      response: 'Playlist Sent!'
    }

    expect(createNewPlaylist(mockUserId, mockAccessToken, mockPlaylistName)).resolves.toEqual(expected)
  })

  it('throws an error if the status code is not ok', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      status: 500
    }))

    expect(createNewPlaylist()).rejects.toEqual(Error('Create New Playlist in Spotify Failed'))
  })
})

describe('populatePlaylist', () => {
  beforeEach(() => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      status: 200
    }))
  })

  it('should be called with the right params', async () => {
    const mockUserId = 'lxbndr'
    const mockPlaylistId = '12345abcde'
    const mockAccessToken = 'abcde12345'
    const mockTracks = ['song1', 'song2', 'song3']

    const mockPlaylistTracks = {uris: mockTracks}

    const expected = [`https://api.spotify.com/v1/users/${mockUserId}/playlists/${mockPlaylistId}/tracks`, {
      method: 'POST',
      body: JSON.stringify(mockPlaylistTracks),
      headers: {
        Authorization: 'Bearer ' + mockAccessToken,
        'Content-Type': 'application/json'
      }
    }]

    populatePlaylist(mockUserId, mockPlaylistId, mockAccessToken, mockTracks)

    expect(window.fetch).toHaveBeenCalledWith(...expected)
  })

  it('returns a status code under 300 if the status is ok', async () => {
    const mockUserId = 'lxbndr'
    const mockPlaylistId = '12345abcde'
    const mockAccessToken = 'abcde12345'
    const mockTracks = ['song1', 'song2', 'song3']

    expect(populatePlaylist(mockUserId, mockPlaylistId, mockAccessToken, mockTracks)).resolves.toEqual(200)
  })

  it('throws an error if the status code is not ok', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      status: 500
    }))

    expect(populatePlaylist()).rejects.toEqual(Error('Add Songs to Playlist Failed'))
  })
})