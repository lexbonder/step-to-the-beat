/* eslint-disable */
import React from 'react';
import { shallow } from 'enzyme';
import { Calculations, MSTP, MDTP } from './Calculations';
import { saveRecentSpm } from '../../actions/actions';

describe('Calculations', () => {
  let wrapper;
  let mockSaveRecentSpm = jest.fn()
  let mockHistory = {push: jest.fn()}

  beforeEach( () => {
    wrapper = shallow(<Calculations
      recentSpms={[]}
      saveRecentSpm={mockSaveRecentSpm}
      history={mockHistory}
    />)
  })

  it('should have default state', () => {
    const expectedState = {
      manual: '',
      heightFeet: '',
      heightInch: '',
      mphSpeed: '',
      mpmMinute: '',
      mpmSecond: '',
      result: '',
      
      manualVisibility: 'hide',
      estimateVisibility: 'show',
      manualButton: '',
      estimateButton: 'focused',
      
      toggleGetButton: 'show',
      toggleResult: 'hide',

      minuteMileVisibility: 'show',
      mileHourVisibility: 'hide',
      minuteMileButton: 'focused',
      mileHourButton: '' 
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

  describe('submitSpm', () => {
    it('should not call saveRecentSpm if the result is already in recentSpms', () => {
      const wrapper = shallow(<Calculations
        recentSpms={[25]}
        saveRecentSpm={mockSaveRecentSpm}
        history={mockHistory}
      />)
      wrapper.state().result = 25
      wrapper.instance().submitSpm()

      expect(mockSaveRecentSpm).not.toHaveBeenCalled()
    })

    it('should redirect the user to /select-spm', () => {
      wrapper.instance().submitSpm()

      expect(mockHistory.push).toHaveBeenCalledWith('/select-spm')
    })

    it('should call saveRecentSpm with whatever is saved in this.state.result and call this.props.history.push', () => {
      wrapper.state().result = 25
      wrapper.instance().submitSpm()

      expect(mockSaveRecentSpm).toHaveBeenCalledWith(wrapper.state().result)
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

  describe('calculateMinutePerMile', () => {
    it('should call this.setStepPerMinute with the pace in decimal form', () => {
      const mockEvent = {preventDefault: jest.fn()}
      wrapper.state().mpmMinute = 10
      wrapper.state().mpmSecond = 30
      wrapper.instance().setStepPerMinute = jest.fn()
      
      wrapper.instance().calculateMinutePerMile(mockEvent)

      expect(wrapper.instance().setStepPerMinute).toHaveBeenCalledWith(10.5)
    })
  })

  describe('calculateMilePerHour', () => {
    it('should call this.setStepPerMinute with the pace in minutes per mile', () => {
      const mockEvent = {preventDefault: jest.fn()}
      wrapper.state().mphSpeed = 6
      wrapper.instance().setStepPerMinute = jest.fn()

      wrapper.instance().calculateMilePerHour(mockEvent)

      expect(wrapper.instance().setStepPerMinute).toHaveBeenCalledWith(10)
    })
  })

  describe('setStepPerMinute', () => {
    it('should calculate Steps Per Minute and set that value into this.state.result', () => {
      const mockPace = 10
      wrapper.state().heightFeet = 5
      wrapper.state().heightInch = 9

      wrapper.instance().setStepPerMinute(mockPace)

      expect(wrapper.state().result).toEqual(159)
    })
  })

  describe('toggleManualEstimate', () => {
    it('should match the snapshot if event.target.name is manual', () => {
      const mockEvent = {target: {name: 'manual'}}
      wrapper.instance().toggleManualEstimate(mockEvent)

      expect(wrapper).toMatchSnapshot()
    })

    it('should set state correctly target is manual', () => {
      const mockEvent = {target: {name: 'manual'}}
      wrapper.instance().toggleManualEstimate(mockEvent)

      expect(wrapper.state().manualVisibility).toEqual('show')
      expect(wrapper.state().estimateVisibility).toEqual('hide')
      expect(wrapper.state().manualButton).toEqual('focused')
      expect(wrapper.state().estimateButton).toEqual('')
    })

    it('should match the snapshot if event.target.name is not manual', () => {
      const mockEvent = {target: {name: 'gopher'}}
      wrapper.instance().toggleManualEstimate(mockEvent)

      expect(wrapper).toMatchSnapshot()
    })

    it('should set state correctly target is not manual', () => {
      const mockEvent = {target: {name: 'gopher'}}
      wrapper.instance().toggleManualEstimate(mockEvent)

      expect(wrapper.state().manualVisibility).toEqual('hide')
      expect(wrapper.state().estimateVisibility).toEqual('show')
      expect(wrapper.state().manualButton).toEqual('')
      expect(wrapper.state().estimateButton).toEqual('focused')
    })
  })

  describe('toggleMeasurement', () => {
    it('should match the snapshot if event.target.name is minuteMile', () => {
      const mockEvent = {target: {name: 'minuteMile'}}
      wrapper.instance().toggleMeasurement(mockEvent)

      expect(wrapper).toMatchSnapshot()
    })

    it('should set state correctly target is minuteMile', () => {
      const mockEvent = {target: {name: 'minuteMile'}}
      wrapper.instance().toggleMeasurement(mockEvent)

      expect(wrapper.state().minuteMileVisibility).toEqual('show')
      expect(wrapper.state().mileHourVisibility).toEqual('hide')
      expect(wrapper.state().minuteMileButton).toEqual('focused')
      expect(wrapper.state().mileHourButton).toEqual('')
    })

    it('should match the snapshot if event.target.name is not minuteMile', () => {
      const mockEvent = {target: {name: 'gopher'}}
      wrapper.instance().toggleMeasurement(mockEvent)

      expect(wrapper).toMatchSnapshot()
    })

    it('should set state correctly target is not minuteMile', () => {
      const mockEvent = {target: {name: 'gopher'}}
      wrapper.instance().toggleMeasurement(mockEvent)

      expect(wrapper.state().minuteMileVisibility).toEqual('hide')
      expect(wrapper.state().mileHourVisibility).toEqual('show')
      expect(wrapper.state().minuteMileButton).toEqual('')
      expect(wrapper.state().mileHourButton).toEqual('focused')
    })
  })

  describe('showResult', () => {
    it('should set this.state.toggleResult to show when called', () => {
      wrapper.instance().showResult()

      expect(wrapper.state().toggleResult).toEqual('show')
    })

    it('should match the snapshot when show when called', () => {
      wrapper.instance().showResult()

      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('MSTP', () => {
    it('should return a recentSpms object with the value of an array', () => {
      const mockState = {recentSpms: [25, 30, 35]}
      const expected = [25, 30, 35]
      const mapped = MSTP(mockState)

      expect(mapped.recentSpms).toEqual(expected)
    })
  })

  describe('MDTP', () => {
    it('should call dispatch when saveRecentSpm is called', () => {
      const mockDispatch = jest.fn()
      const mockSpm = 148
      const result = MDTP(mockDispatch)
      result.saveRecentSpm(mockSpm)
      expect(mockDispatch).toHaveBeenCalledWith(saveRecentSpm(148))
    })
  })
})