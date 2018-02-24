/* eslint-disable */
import React from 'react';
import { shallow } from 'enzyme';
import { SelectGenre, MDTP } from './SelectGenre';
import { selectGenre, saveRecentGenre } from '../../actions/actions';

describe('SelectGenre', () => {
  let wrapper;
  let mockSelectGenre = jest.fn()
  let mockSaveRecentGenre = jest.fn()

  beforeEach(() => {
    wrapper = shallow(<SelectGenre 
      selectGenre={mockSelectGenre}
      saveRecentGenre={mockSaveRecentGenre}
    />)
  })

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should have a default state', () => {
    const mockState = {
      searchParam: '',
      selectedGenre: ''
    }

    expect(wrapper.state()).toEqual(mockState)
  })

  describe('getGenres', () => {
    it('should match the snapshot based on the search parameters in state', () => {
      wrapper.state().searchParam = 'rock'

      expect(wrapper.instance().getGenres).toMatchSnapshot()
    })    
  })

  describe('makeSelection', () => {
    let mockEvent = {
      target: {
        classList: {
          add: jest.fn()
        },
        innerText: 'ska'
      }
    }
    beforeEach(() => {
      wrapper.instance().makeSelection(mockEvent)
    })

    it('should match the snapshot when an event is fired', () => {
      expect(wrapper.instance().makeSelection).toMatchSnapshot()
    })

    it('should set selectedGenre as event.target.innerText', () => {
      expect(wrapper.state().selectedGenre).toEqual('ska')
    })

    it('should call add with an argument of selected', () => {
      expect(mockEvent.target.classList.add).toHaveBeenCalledWith('selected')
    })
  })

  describe('handleClick', () => {
    beforeEach(() => {
      wrapper.state().selectedGenre = 'Ska';
      wrapper.instance().handleClick()
    })

    it('should call selectGenre with whatever is saved in state but lower case', () => {
      expect(mockSelectGenre).toHaveBeenCalledWith('ska')
    })

    it('should call saveRecentGenre with whatever is saved in state but lower case', () => {
      expect(mockSaveRecentGenre).toHaveBeenCalledWith('ska')
    })
  })

  describe('handleSearchParam', () => {
    const mockEvent = {target: {value: 'Ska'}}

    beforeEach(() => {
      wrapper.state().selectedGenre = 'Rock'
      wrapper.instance().handleSearchParam(mockEvent)
    })

    it('should match the snapshot', () => {
      expect(wrapper.instance().handleSearchParam(mockEvent)).toMatchSnapshot()
    })

    it('should set searchParam to the value of the event', () => {
      expect(wrapper.state().searchParam).toEqual('Ska')
    })

    it('should clear out whatever is in selectedGenre', () => {
      expect(wrapper.state().selectedGenre).toEqual('')
    })
  })

  describe('MDTP', () => {
    let mockDispatch = jest.fn()
    let result;

    beforeEach(() => {
      result = MDTP(mockDispatch)
    })

    it('should call dispatch when selectGenre is called', () => {
      result.selectGenre('ska')

      expect(mockDispatch).toHaveBeenCalledWith(selectGenre('ska'))
    })

    it('should call dispatch when saveRecentGenre is called', () => {
      result.saveRecentGenre('ska')

      expect(mockDispatch).toHaveBeenCalledWith(saveRecentGenre('ska'))
    })
  })
})
