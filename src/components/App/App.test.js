import React from 'react';
import { App } from './App';
import { shallow } from 'enzyme';

it('should match the snapshot', () => {
  const wrapper = shallow(<App />);

  expect(wrapper).toMatchSnapshot()
});
