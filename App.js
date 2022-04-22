import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import Root from './src/routers';
import {Provider} from 'react-redux';
import {store} from './src/store';

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <Root />
    </Provider>
  );
}
