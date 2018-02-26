import React from 'react';
import { shallow } from 'enzyme';
import LoadingGif from './LoadingGif';

describe('LoadingGif', () => {
  it('should match the snapshot', () => {
    const wrapper = shallow(<LoadingGif />);
    expect(wrapper).toMatchSnapshot();
  });
});