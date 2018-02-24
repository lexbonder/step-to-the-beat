import React from 'react';
import { shallow } from 'enzyme';
import { Home, MSTP } from './Home';

describe('Home', () => {
  describe('While a user is logged in', () => {
    it('should match the snapshot', () => {
      const wrapper = shallow(<Home loggedIn={true} />)
      expect(wrapper).toMatchSnapshot()
    })

    describe('view', () => {
      it('should match the snapshot', () => {
        const wrapper = shallow(<Home loggedIn={true} />)
        expect(wrapper.instance().view()).toMatchSnapshot()
      })
    })
  })

  describe('While a user is not logged in', () => {
    it('should match the snapshot', () => {
      const wrapper = shallow(<Home loggedIn={false} />)
      expect(wrapper).toMatchSnapshot()
    })

    describe('view', () => {
      it('should return undefined', () => {
        const wrapper = shallow(<Home loggedIn={false} />)
        expect(wrapper.instance().view()).toEqual(undefined)
      })
    })
  })

  describe('MSTP', () => {
    it('should return an object with the values from state', () => {
      const mockState = {loggedIn: true}
      const mapped = MSTP(mockState)

      expect(mapped.loggedIn).toEqual(true)
    })
  })
})