import React from 'react';
import {create} from 'react-test-renderer';
import Home from '../..//src/screens/Home';
import testContainer from '../../src/helpers/testContainer';

describe('should loading', () => {
  test('should first loading', () => {
    const component = create(testContainer(<Home />)).toJSON();
    expect(component).toMatchSnapshot();
  });
});
