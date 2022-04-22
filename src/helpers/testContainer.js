import React from 'react';
import {Provider} from 'react-redux';
import {store} from '../store';

export default function testContainer(component) {
  return <Provider store={store}>{component}</Provider>;
}
