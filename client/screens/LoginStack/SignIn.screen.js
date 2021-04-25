/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLazyQuery } from '@apollo/client';
import InputFieldLarge from '../../components/inputField.large.component';
import ButtonLarge from '../../components/button.large.component';
import { USER_SIGN_IN } from '../../GraphQL/queriesDeclarations';

function SignInScreen({navigation}) {

  const [userData, setUserData] = useState({email: '', password: ''});
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [querySignIn, {data}] = useLazyQuery(USER_SIGN_IN);

  const emailInput = (emailText) => {
    const newData = userData;
    newData.email = emailText;
    setEmail(emailText);
    setUserData(newData);
  };

  const passwordInput = (passwordText) => {
    const newData = userData;
    newData.password = passwordText;
    setPassword(passwordText);
    setUserData(newData);
  };

  async function signIn() {
    try {
      console.log(userData);
      await querySignIn({ variables: {
        logInEmail: userData.email,
        logInPassword: userData.password,
      }});
      if (data.logIn.success) {
        const jsonValue = await JSON.stringify({uid: data.logIn.user._id, username: data.logIn.user.nickname});
        await AsyncStorage.setItem('authInfo', jsonValue);
      }
    } catch (error) {
      console.log(error);
    }
    console.log(userData);
    setEmail('');
    setPassword('');
    setUserData({email: '', password: ''});
    navigation.navigate('MainTabScreen');
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../assets/logo.png')}
          style={styles.logo}
          resizeMode="stretch"
        />
        <Text style={styles.title}>Welcome back!</Text>
        <Text style={styles.title}>Enter your login details</Text>
      </View>

      <View style={styles.footer}>
        <InputFieldLarge
          text="Email"
          secure={false}
          iconName="user"
          onTextInput = {emailInput}
          inputValue = {email}
          featherIconName="check-circle"
          // x-circle
          featherColor="green"
        />
        <InputFieldLarge
          text="Password"
          secure={true}
          iconName="lock"
          onTextInput = {passwordInput}
          inputValue = {password}
          featherIconName="eye-off"
          // "eye"
          featherColor="grey"
        />
        <View style={styles.button}>
          <ButtonLarge onClick={signIn} text={'Sign In'} />
        </View>
      </View>
    </View>
  );
}
const {height} = Dimensions.get('screen');
const height_logo = height * 0.3;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#5ce1e6',
  },
  header: {
    flex: 0.5,
    alignSelf: 'stretch',
    backgroundColor: 'transparent',
    paddingVertical: 50,
    paddingHorizontal: 30,
    justifyContent: 'flex-end',
  },
  footer: {
    flex: 0.5,
    paddingVertical: 50,
    paddingHorizontal: 30,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignSelf: 'stretch',
  },
  button: {
    marginTop: 80,
    alignSelf: 'stretch',
    height: 75,
  },
  title: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'sans-serif-medium',
  },
  logo: {
    alignSelf: 'center',
    width: height_logo,
    height: height_logo,
  },
});

export default SignInScreen;