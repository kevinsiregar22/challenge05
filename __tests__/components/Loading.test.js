import React from 'react';
import {render} from '@testing-library/react-native';
import Loading from '../../src/components/Loading';

describe('should loading', () => {
  test('should first loading', () => {
    const component = render(<Loading />);
    expect(component).toMatchSnapshot();
  });
});
