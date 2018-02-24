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