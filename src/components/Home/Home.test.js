/* eslint-disable */
import React from 'react';
import { shallow } from 'enzyme';
import Home from './Home';
import * as authorizeSpotify from '../../authorizeSpotify';

describe('Home', () => {
  it('should match the snapshot', () => {
    const wrapper = shallow(<Home />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should call authorize when the button is clicked', () => {
    authorizeSpotify.authorize= jest.fn()
    const wrapper = shallow(<Home />)
    wrapper.find('button').simulate('click')

    expect(authorizeSpotify.authorize).toHaveBeenCalled()
  })
})