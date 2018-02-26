import React from 'react';
import { shallow } from 'enzyme';
import LoadingGif from './LoadingGif';

describe('LoadingGif', () => {
  it('should match the snapshot', () => {
    Math.random = jest.fn().mockImplementation(() => 0)
    const wrapper = shallow(<LoadingGif />);
    expect(wrapper).toMatchSnapshot();
  });
});