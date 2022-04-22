import React from 'react';
import LogoHeader from '../../src/components/LogoHeader';
import {render} from '@testing-library/react-native';

describe('should LogoHeader', () => {
  test('test LogoHeader', () => {
    const component = render(<LogoHeader />);
    expect(component).toMatchSnapshot();
  });
});
