/* eslint-disable */
import React from 'react';
import { shallow } from 'enzyme';
import { SelectSpm, MSTP, MDTP } from './SelectSpm';
import { selectSpm, saveRecentSpm } from '../../actions/actions';

describe('SelectSpm', () => {
  let wrapper;
  let mockRecentSpms = [148, 160]
  let mockSaveRecentSpm = jest.fn()
  let mockSelectSpm = jest.fn()
  let mockHistory = { push: jest.fn() }

  beforeEach(() => {
    wrapper = shallow(<SelectSpm
      recentSpms={mockRecentSpms}
      saveRecentSpm={mockSaveRecentSpm}
      selectSpm={mockSelectSpm}
      history={mockHistory}
    />)
  })

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should have default props', () => {
    const mockState = { selection: '' }
    expect(wrapper.state()).toEqual(mockState)
  })

  describe('componentDidUpdate', () => {
    it('should call getRecentSpms', () => {
      wrapper.instance().getRecentSpms = jest.fn()

      wrapper.instance().componentDidUpdate()

      expect(wrapper.instance().getRecentSpms).toHaveBeenCalled()
    })
  })

  describe('getRecentSpms', () => {
    it('should match the snapshot if there are recent SPMs', () => {
      expect(wrapper.instance().getRecentSpms()).toMatchSnapshot()
    })

    it('should match the snapshot if there are no SPMs', () => {
      const wrapper = shallow(<SelectSpm
        recentSpms={[]}
        saveRecentSpm={mockSaveRecentSpm}
        selectSpm={mockSelectSpm}
        history={mockHistory}
      />)
      expect(wrapper.instance().getRecentSpms()).toMatchSnapshot()
    })
  })

  describe('selectRecent', () => {
    it('should set selection with the value of event.target.innerText', () => {
      const mockEvent = {target: {innerText: '140'}}
      wrapper.instance().selectRecent(mockEvent)
      expect(wrapper.state().selection).toEqual(140)
    })
  })

  describe('handleClick', () => {
    it('should not call saveRecentSpm if the value in selection is already in this.props.recentSpms', () => {
      wrapper.state().selection = 148
      wrapper.instance().handleClick()
      expect(mockSaveRecentSpm).not.toHaveBeenCalled()
    })

    it('should call saveRecentSpm if the value in selection is not in this.props.recentSpms', () => {
      wrapper.state().selection = 140
      wrapper.instance().handleClick()
      expect(mockSaveRecentSpm).toHaveBeenCalledWith(140)
    })
    
    it('should call selectSpm with the value in this.state.selection', () => {
      wrapper.state().selection = 140
      wrapper.instance().handleClick()
      expect(mockSelectSpm).toHaveBeenCalledWith(140)
    })

    it('should redirect the user to /select-genre', () => {
      wrapper.instance().handleClick()
      expect(mockHistory.push).toHaveBeenCalledWith('/select-genre')
    })
  })

  describe('handleChange', () => {
    it('should parse the event value and store it in this.state.selection', () => {
      const mockEvent = {target: {value: '150'}}
      wrapper.instance().handleChange(mockEvent)
      expect(wrapper.state().selection).toEqual(150)
    })
  })

  describe('handleBackButton', () => {
    it('should redirect the user to /saved-playlists', () => {
      wrapper.instance().handleBackButton()
      expect(mockHistory.push).toHaveBeenCalledWith('/saved-playlists')
    })
  })

  describe('MSTP', () => {
    it('should return an object with the value it has in state', () => {
      const mockState = {recentSpms: mockRecentSpms}
      const mapped = MSTP(mockState)
      expect(mapped.recentSpms).toEqual(mockRecentSpms)
    })
  })

  describe('MDTP', () => {
    let mockDispatch = jest.fn()
    let result;

    beforeEach(() => {
      result = MDTP(mockDispatch)
    })

    it('should call dispatch when saveRecentSpm is called', () => {
      result.saveRecentSpm(150)
      expect(mockDispatch).toHaveBeenCalledWith(saveRecentSpm(150))
    })

    it('should call dispatch when selectSpm is called', () => {
      result.selectSpm(150)
      expect(mockDispatch).toHaveBeenCalledWith(selectSpm(150))
    })
  })
})