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
    name: 'Alex' , id: 'lxbndr'
  }))