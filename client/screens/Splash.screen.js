/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StyleSheet, Dimensions, Image} from 'react-native';
import ButtonLightBlue from '../components/button.lightblue.component';

function SplashScreen({navigation}) {

  function onPressSignIn() {
    navigation.navigate('SignInScreen');
  }

  function onPressSignUp() {
    navigation.navigate('SignUpScreen');
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../assets/logo.png')}
          style={styles.logo}
          resizeMode="stretch"
        />
      </View>
      <View style={styles.footer}>
        <Text style={styles.title}>Connect with your new training partners</Text>
        <Text style={styles.text}>Sign in with existing account or register!</Text>

        <View style={styles.buttonContainer}>
          <ButtonLightBlue
            onClick={onPressSignIn}
            text={'Sign In'}
            />
          <ButtonLightBlue
            onClick={onPressSignUp}
            text={'Sign Up'}
            />
        </View>

      </View>
    </View>
  );
}

const {height} = Dimensions.get('screen');
const height_logo = height * 0.5;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5ce1e6',
  },
  header: {
    flex:2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 0.7,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  logo: {
    width: height_logo,
    height: height_logo,
  },
  title: {
    color: '#05375a',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text: {
    color: 'grey',
    marginTop: 5,
    textAlign: 'center',
  },
  buttonContainer: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '30%',
  },
  signIn: {
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    flexDirection: 'row',
  },
  textSign: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default SplashScreen;
