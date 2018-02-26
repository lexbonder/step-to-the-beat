/* eslint-disable */
export const getPlaylistData = jest.fn()
  .mockImplementationOnce(() => ({
    tracks: [
      {
        artists: [{name: 'I fight Dragons'}],
        name: 'Dont you?',
        id: '12341234',
        uri: 'spotify:track:12341234'
      }
    ]
  }))

export const getUserName = jest.fn()
  .mockImplementation(() => ({
    name: 'Alex' , id: 'lxbndr', image:'superlongurl'
  }))

export const createNewPlaylist = jest.fn()
  .mockImplementationOnce(() => ({
    response: `Alex's 148 SPM, ska playlist created successfully`,
    playlistId: '12345abcde'
  }))

export const populatePlaylist = jest.fn()