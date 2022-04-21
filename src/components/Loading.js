import {View, ActivityIndicator} from 'react-native';
import React from 'react';
import {ms} from 'react-native-size-matters';

export default function Loading() {
  return (
    <View flex={1} justifyContent="center" alignItems="center">
      <ActivityIndicator size={ms(120)} />
    </View>
  );
}
