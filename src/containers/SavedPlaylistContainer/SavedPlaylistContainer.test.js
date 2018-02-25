/* eslint-disable */
import React from 'react';
import { shallow } from 'enzyme';
import { SavedPlaylistContainer, MSTP } from './SavedPlaylistContainer';

describe('SavedPlaylistContainer', () => {
  let wrapper;
  let mockHistory = { push: jest.fn() }
  let mockRecentSeeds = [
    {spm: 148, genre: 'ska'},
    {spm: 160, genre: 'rock'}
  ]

  beforeEach(() => {
    wrapper = shallow(<SavedPlaylistContainer 
      history={mockHistory}
      recentSeeds={mockRecentSeeds}
    />)
  })

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  describe('savedPlaylistsToRender', () => {
    it('should match the snapshot if there are recentSeeds', () => {
      expect(wrapper.instance().savedPlaylistsToRender()).toMatchSnapshot()
    })

    it('should match the snapshot if there are no recentSeeds', () => {
      const wrapper = shallow(<SavedPlaylistContainer 
        history={mockHistory}
        recentSeeds={[]}
      />)

      expect(wrapper.instance().savedPlaylistsToRender()).toMatchSnapshot()
    })
  })

  describe('handleClick', () => {
    it('should redirect the user to /select-spm', () => {
      wrapper.instance().handleClick()
      expect(mockHistory.push).toHaveBeenCalledWith('/select-spm')
    })
  })

  describe('MSTP', () => {
    it('should return an object with the values of whatever is in state', () => {
      const mockState = {recentSeeds: mockRecentSeeds}
      const mapped = MSTP(mockState)
      expect(mapped.recentSeeds).toEqual(mockRecentSeeds)
    })
  })
})