import {SafeAreaView, Text, StyleSheet, Button} from 'react-native';
import React from 'react';
import Pdf from 'react-native-pdf';
import Poppins from './Poppins';

export default function PDF() {
  return (
    <SafeAreaView style={styles.container}>
      <Poppins type="Bold">Open With pdf</Poppins>
      <Pdf
        source={{
          uri: 'http://samples.leanpub.com/thereactnativebook-sample.pdf',
        }}
        style={styles.pdf}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pdf: {
    height: 6250,
    width: 390,
    borderRadius: 10,
  },
});
