import React from 'react';
import Poppins from '../../src/components/Poppins';
import {render} from '@testing-library/react-native';

describe('Poppins Testing', () => {
  const {getByTestId, toJSON} = render(<Poppins color="white">audy</Poppins>);
  test('render with 14px size', () => {
    const element = getByTestId('text component');
    expect(element).toBeTruthy();
    expect(element.props.style.fontSize).toEqual(14);
    expect(element.props.style.color).toEqual('white');
    expect(toJSON()).toMatchSnapshot();
  });
});
