import {
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View,
  Alert,
  Image,
} from 'react-native';
import React from 'react';
import {ms} from 'react-native-size-matters';
import axios from 'axios';

import {useDispatch, useSelector} from 'react-redux';
import {
  setRegisterName,
  setRegisterEmail,
  setRegisterPassword,
} from './redux/action';

import {Button, Input} from '@rneui/base';
import {colors} from '../../utils';
import {navigate} from '../../helpers/navigate';
import {API} from '../../config/API';
import LogoHeader from '../../components/LogoHeader';
import Poppins from '../../components/Poppins';

const Index = ({navigation}) => {
  const dispatch = useDispatch();
  const {email, password, name} = useSelector(state => state.register);

  const checkValid = () => {
    let regexPass = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$');
    let regexEmail = new RegExp(
      '^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$',
    );

    const resRegexPass = regexPass.test(password);
    const resRegexEmail = regexEmail.test(email);

    if (name.length === 0 && email.length === 0 && password.length === 0) {
      Alert.alert('Please fill in the name, email and password in this form');
    } else if (resRegexEmail === !true) {
      Alert.alert('email format is not valid');
    } else if (resRegexPass === !true) {
      Alert.alert('password format is not valid');
    } else {
      const body = {
        name: name,
        email: email,
        password: password,
      };
      return body;
    }
  };

  const postRegister = async () => {
    const body = checkValid(name, email, password);
    try {
      const res = await axios.post(API.BASE_API.concat('/auth/register'), body);
      console.log(res, 'resul');
      if (res.status === 201);
      Alert.alert('Register Succes');
      navigation.navigate('Login');
      // navigation.navigate('Success');
    } catch (error) {
      console.log('gaaal');
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <LogoHeader />
      <Input
        inputStyle={{fontSize: 18, paddingVertical: 15}}
        inputContainerStyle={{
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderLeftWidth: 1,
          borderRightWidth: 1,
          borderRightWidth: 1,
          borderColor: colors.border.color,
          borderRadius: 10,
        }}
        containerStyle={{paddingTop: 20, marginTop: 20}}
        leftIconContainerStyle={{
          marginRight: 8,
          marginLeft: 10,
        }}
        placeholder="Username"
        leftIcon={{
          type: 'font-awesome-5',
          name: 'user-alt',
          size: 24,
          color: colors.icon.color,
        }}
        onChangeText={text => dispatch(setRegisterName(text))}
      />
      <Input
        inputStyle={{fontSize: 18, paddingVertical: 15}}
        inputContainerStyle={{
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderLeftWidth: 1,
          borderRightWidth: 1,
          borderRightWidth: 1,
          borderColor: colors.border.color,
          borderRadius: 10,
        }}
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
        onChangeText={text => dispatch(setRegisterEmail(text))}
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
          borderRightWidth: 1,
          borderColor: colors.border.color,
          borderRadius: 10,
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
        onChangeText={text => dispatch(setRegisterPassword(text))}
        secureTextEntry={true}
      />
      <Button
        onPress={postRegister}
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
        title="REGISTER"
      />

      <Poppins size={16}>Already have account ?</Poppins>

      <TouchableOpacity onPress={() => navigate('Login')}>
        <Poppins type="Bold" size={18}>
          LOGIN
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
