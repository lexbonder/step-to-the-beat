/* eslint-disable */
import { recentSeedsReducer } from '../recentSeedsReducer';

describe('recentSeedsReducer', () => {
  it('should return an empty array by default', () => {
    expect(recentSeedsReducer(undefined, {})).toEqual([])
  })

  it('should add a seed into state if the type is SAVE_RECENT_SEED', () => {
    const mockState = [{spm: 150, genre: 'rock', id: 3}]
    const mockAction = {
      type: 'SAVE_RECENT_SEED',
      seed: {spm: 148, genre: 'ska', id: 5}
    }

    const expected = [
      {spm: 150, genre: 'rock', id: 3},
      {spm: 148, genre: 'ska', id: 5}
    ]

    expect(recentSeedsReducer(undefined, mockAction)).toEqual([{spm: 148, genre: 'ska', id: 5}])
    expect(recentSeedsReducer(mockState, mockAction)).toEqual(expected)
  })

  it('should remove a seed from state if the type is DELETE_SEED', () => {
    const mockState = [{spm: 148, genre: 'ska', id: 5}, {spm: 160, genre: 'rock', id: 3}]
    const mockAction = {type: 'DELETE_SEED', id: 3}
    const expected =[{spm: 148, genre: 'ska', id: 5}]

    expect(recentSeedsReducer(mockState, mockAction)).toEqual(expected)
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