/* eslint-disable */
import { recentSeedsReducer } from '../recentSeedsReducer';

describe('recentSeedsReducer', () => {
  it('should return an empty array by default', () => {
    expect(recentSeedsReducer(undefined, {})).toEqual([])
  })

  it('should add a seed into state if the type is SAVE_RECENT_SEED', () => {
    const mockAction = {
      type: 'SAVE_RECENT_SEED',
      seed: {spm: 148, genre: 'ska'}
    }

    const expected = [
      {spm: 150, genre: 'rock'},
      {spm: 148, genre: 'ska'}
    ]

    expect(recentSeedsReducer(undefined, mockAction)).toEqual([{spm: 148, genre: 'ska'}])
    expect(recentSeedsReducer([{spm: 150, genre: 'rock'}], mockAction)).toEqual(expected)
  })

  it('should add an array of seeds from firebase if the type is SEEDS_FROM_FIREBASE', () => {
    const mockSeeds = [
      {spm: 150, genre: 'rock'},
      {spm: 148, genre: 'ska'}
    ]
    const mockAction = {
      type: 'SEEDS_FROM_FIREBASE',
      seeds: mockSeeds
    }

    expect(recentSeedsReducer(undefined, mockAction)).toEqual(mockSeeds)
  })
})