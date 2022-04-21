import {Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import succes from '../../assets/alerts/success.json';
import LottieView from 'lottie-react-native';
import {StyleSheet} from 'react-native';
import {ms} from 'react-native-size-matters';
import Poppins from '../../components/Poppins';

const Success = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Poppins type="Bold" size={27}>
        Registration Completed!
      </Poppins>

      <LottieView
        source={succes}
        autoPlay={true}
        loop={false}
        style={styles.checker}
      />

      <View style={styles.titleTextEmail}>
        <Poppins type="Medium" size={18}>
          We Sent email verification to
        </Poppins>
        <Poppins type="Medium" size={18}>
          your email
        </Poppins>

        <TouchableOpacity
          style={styles.backLoginButton}
          onPress={() => navigation.navigate('Login')}>
          <Poppins type="Bold" size={27}>
            Back to Login
          </Poppins>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Success;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'aqua',
    justifyContent: 'space-aroud',
    // alignItems: 'center',
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: ms(20),
    marginTop: ms(45),
  },
  titleTextEmail: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  checker: {
    flex: 1,
    marginTop: -120,
  },
  checkerText: {
    fontWeight: 'bold',
    fontSize: ms(16),
  },
  backLoginButton: {
    marginTop: ms(10),
    marginBottom: ms(45),
    backgroundColor: 'lightgreen',
    borderRadius: ms(8),
    width: ms(300),
    padding: ms(12),
  },
  backLoginText: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: ms(19),
  },
});
