import { recentGenresReducer } from '../recentGenresReducer';

describe('recentGenresReducer', () => {
  it('should return an empty array by default', () => {
    expect(recentGenresReducer(undefined, {})).toEqual([])
  })

  it('should add a genre into state if the type is SAVE_RECENT_GENRE', () => {
    const mockAction = {
      type: 'SAVE_RECENT_GENRE',
      genre: 'ska'
    }

    expect(recentGenresReducer(undefined, mockAction)).toEqual(['ska'])
    expect(recentGenresReducer(['rock'], mockAction)).toEqual(['rock', 'ska'])
  })

  it('should add an array of genres from firebase if the type is GENRES_FROM_FIREBASE', () => {
    const mockGenres = ['rock', 'ska']
    const mockAction = {
      type: 'GENRES_FROM_FIREBASE',
      genres: mockGenres
    }

    expect(recentGenresReducer(undefined, mockAction)).toEqual(mockGenres)

  })
})