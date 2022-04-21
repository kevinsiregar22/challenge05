import React from 'react';
import {Text, StyleSheet} from 'react-native';

const Poppins = ({
  type = 'Regular',
  children,
  color = 'black',
  size = 14,
  textAlign = 'center',
}) => {
  //styled
  const style = StyleSheet.create({
    text: {
      fontFamily: `Poppins-${type}`,
      color: color,
      fontSize: size,
      textAlign: textAlign,
    },
  });
  return (
    <Text testID="text component" style={style.text}>
      {children}
    </Text>
  );
};

export default Poppins;
