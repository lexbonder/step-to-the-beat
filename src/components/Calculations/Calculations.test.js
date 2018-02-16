import React from 'react';
import {shallow} from 'enzyme';
import {Calculations} from './Calculations';

describe('Calculations', () => {
  let wrapper;

  beforeEach( () => {
    wrapper = shallow(<Calculations />)
  })

  it('should have default state', () => {
    const expectedState = {
      manual: '',
      heightFeet: '',
      heightInch: '',
      mphSpeed: '',
      mpmMinute: '',
      mpmSecond: '',
      result: ''
    }
    expect(wrapper.state()).toEqual(expectedState);
  })

  describe('handleChange', () => {
    it('should set state with whichever input changes', () => {
      const mockEvent = {target: {name: 'manual', value: 37}}
      wrapper.instance().handleChange(mockEvent)
      expect(wrapper.state().manual).toEqual(37)
    })
  })

  describe('calculateManual', () => {
    it('should set result based on what is in state.manual', () => {
      const mockEvent = {preventDefault: jest.fn()}
      wrapper.state().manual = 1;
      wrapper.instance().calculateManual(mockEvent)
      expect(wrapper.state().result).toEqual(4)
    })
  })
})