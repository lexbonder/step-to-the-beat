import { recentSpmsReducer } from '../recentSpmsReducer';

describe('recentSpmsReducer', () => {
  it('should return an empty array by default', () => {
    expect(recentSpmsReducer(undefined, {})).toEqual([])
  })

  it('should add an spm into state if the type is SAVE_RECENT_SPM', () => {
    const mockAction = {
      type: 'SAVE_RECENT_SPM',
      spm: 148
    } 

    expect(recentSpmsReducer(undefined, mockAction)).toEqual([148])
    expect(recentSpmsReducer([150], mockAction)).toEqual([150, 148])
  })

  it('should add an array of spms from firebase if the type is SPMS_FROM_FIREBASE', () => {
    const mockSpms = [150, 148]
    const mockAction = {
      type: 'SPMS_FROM_FIREBASE',
      spms: mockSpms
    }

    expect(recentSpmsReducer(undefined, mockAction)).toEqual(mockSpms)
  })
})