/* eslint-disable */
import { newSeedReducer } from '../newSeedReducer';

describe('newSeedReducer', () => {
  it('should return an empty object by default', () => {
    expect(newSeedReducer(undefined, {})).toEqual({})
  })

  it('should add an spm to state if the action type is SELECT_SPM', () => {
    const mockAction = {
      type: 'SELECT_SPM',
      spm: 148
    }
    expect(newSeedReducer(undefined, mockAction)).toEqual({spm: 148})
    expect(newSeedReducer({genre: 'ska'}, mockAction)).toEqual({spm: 148, genre: 'ska'})
  })

  it('should add a genre to state if the action type is SELECT_GENRE', () => {
    const mockAction = {
      type: 'SELECT_GENRE',
      genre: 'ska'
    }

    expect(newSeedReducer(undefined, mockAction)).toEqual({genre: 'ska'})
    expect(newSeedReducer({spm: 148}, mockAction)).toEqual({genre: 'ska', spm: 148})
  })

  it('should add a whole seed if the action type is SELECT_SEED', () => {
    const mockAction = {
      type: 'SELECT_SEED',
      seed: {
        genre: 'ska',
        spm: 148
      }
    }

    expect(newSeedReducer(undefined, mockAction)).toEqual({genre: 'ska', spm: 148})
  })
})