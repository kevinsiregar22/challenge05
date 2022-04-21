import {StyleSheet, TouchableOpacity, View, Alert} from 'react-native';
import {ms} from 'react-native-size-matters';
import React from 'react';
import {Input, Button} from '@rneui/base';
import {
  setLoginEmail,
  setLoginPassword,
  setToken,
  setName,
} from './redux/action';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';

import {API} from '../../config/API';
import {colors} from '../../utils';
import {navigate} from '../../helpers/navigate';
import Poppins from '../../components/Poppins';
import LogoHeader from '../../components/LogoHeader';

const Index = () => {
  const {email, password, token} = useSelector(state => state.login);
  const dispatch = useDispatch();

  const checkValid = (email, password) => {
    if (email.length === 0 && password.length === 0) {
      Alert.alert('Please fill in the email and password in this form');
    } else {
      const body = {
        email: email, //siregar25v@gmail.com
        password: password, //siregar25
      };
      return body;
    }
  };

  const login = async () => {
    try {
      const body = checkValid(email, password);
      const res = await axios.post(API.BASE_API.concat('/auth/login'), body);

      dispatch(setToken(res.data.tokens.access.token));

      const getName = () => {
        dispatch(setName(res.data.user.name));
      };
      getName();

      if (res.status === 200) {
        navigate('Home');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <LogoHeader />
      <Input
        inputStyle={{fontSize: 18, paddingVertical: 15}}
        inputContainerStyle={{
          borderTopWidth: 2,
          borderBottomWidth: 2,
          borderLeftWidth: 2,
          borderRightWidth: 2,
          borderColor: colors.border.color,
          borderRadius: 10,
        }}
        containerStyle={{paddingTop: 20, marginTop: 20}}
        leftIconContainerStyle={{
          marginRight: 8,
          marginLeft: 10,
        }}
        placeholder="Email"
        leftIcon={{
          type: 'material-icons',
          name: 'email',
          size: 30,
          color: colors.icon.color,
        }}
        onChangeText={text => dispatch(setLoginEmail(text))}
      />

      <Input
        inputStyle={{
          fontSize: 18,
          paddingVertical: 15,
          alignContent: 'center',
          justifyContent: 'center',
        }}
        inputContainerStyle={{
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderLeftWidth: 1,
          borderRightWidth: 1,
          borderColor: colors.border.color,
          borderRadius: 10,
        }}
        containerStyle={{
          marginTop: 7,
        }}
        leftIconContainerStyle={{
          marginRight: 8,
          marginLeft: 10,
        }}
        placeholder="Password"
        leftIcon={{
          type: 'font-awesome-5',
          name: 'key',
          size: 30,
          color: colors.icon.color,
        }}
        onChangeText={text => dispatch(setLoginPassword(text))}
        secureTextEntry={true}
      />
      <Button
        onPress={login}
        buttonStyle={{
          padding: 15,
          borderRadius: 10,
          backgroundColor: colors.button.background,
        }}
        containerStyle={{
          paddingHorizontal: 10,
          marginTop: 25,
          marginBottom: 10,
        }}
        titleStyle={{
          fontSize: 24,
          letterSpacing: 5,
          alignContent: 'center',
          justifyContent: 'center',
        }}
        title="LOGIN"
      />

      <Poppins size={16}>Don't have an account?</Poppins>

      <TouchableOpacity onPress={() => navigate('Register')}>
        <Poppins type="Bold" size={18}>
          REGISTER
        </Poppins>
      </TouchableOpacity>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundPage,
    flex: 1,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: ms(160),
    height: ms(160),
  },
});
