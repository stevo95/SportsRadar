/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import InputField from '../components/inputField.component';
import ButtonLarge from '../components/button.large.component ';

function SignUpScreen() {

  const [newUserData, setNewUserData] = useState({username: '', email: '', password: ''});
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const usernameInput = (usernameText) => {
    const newData = newUserData;
    newData.username = usernameText;
    setUsername(usernameText);
    setNewUserData(newData);
  };

  const emailInput = (emailText) => {
    const newData = newUserData;
    newData.email = emailText;
    setEmail(emailText);
    setNewUserData(newData);
  };

  const passwordInput = (passwordText) => {
    const newData = newUserData;
    newData.password = passwordText;
    setPassword(passwordText);
    setNewUserData(newData);
  };

  function signUp() {
    console.log(newUserData);
    setEmail('');
    setPassword('');
    setUsername('');
    setNewUserData({email: '', password: ''});
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../assets/logo.png')}
          style={styles.logo}
          resizeMode="stretch"
        />
        <Text style={styles.title}>Enter your user details</Text>
      </View>

      <View style={styles.footer}>
        <InputField
          text="Username"
          secure= {false}
          iconName="user"
          onTextInput = {usernameInput}
          inputValue = {username}
          featherIconName="check-circle"
          // x-circle
          featherColor="green"
        />
        <InputField
          text="Email"
          secure= {false}
          iconName="envelope"
          onTextInput = {emailInput}
          inputValue = {email}
          featherIconName="check-circle"
          // x-circle
          featherColor="green"
        />
        <InputField
          text="Password"
          secure= {true}
          iconName="lock"
          onTextInput = {passwordInput}
          inputValue = {password}
          featherIconName="eye-off"
          // "eye"
          featherColor="grey"
        />
        <View style={styles.button}>
          <ButtonLarge onClick={signUp} text={'Sign Up'} />
        </View>
      </View>
    </View>
  );
}

const {height} = Dimensions.get('screen');
const height_logo = height * 0.4;

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

export default SignUpScreen;
