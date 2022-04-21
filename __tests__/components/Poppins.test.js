import React from 'react';
import Poppins from '../../src/components/Poppins';
import {render} from '@testing-library/react-native';

describe('Poppins Testing', () => {
  const {getByTestId, toJSON} = render(<Poppins color="white">kevin</Poppins>);
  test('render with props in poppins', () => {
    const element = getByTestId('text component');
    expect(element).toBeTruthy();
    expect(element.props.style.fontSize).toEqual(16);
    expect(element.props.style.color).toEqual('white');
    expect(element.props.style.textAlign).toEqual('center');
    expect(element.props.style.marginTop).toEqual(1);
    expect(element.props.style.marginRight).toEqual(1);
    expect(element.props.style.marginBottom).toEqual(10);
    expect(element.props.style.marginLeft).toEqual(15);
    expect(toJSON()).toMatchSnapshot();
  });
});
