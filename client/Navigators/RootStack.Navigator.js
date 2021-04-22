/* eslint-disable prettier/prettier */
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from '../screens/Splash.screen';
import SignInScreen from '../screens/SignIn.screen';
import SignUpScreen from '../screens/SignUp.screen';
import MainTabScreen from './MainTab.Navigator';

const RootStack = createStackNavigator();

function RootStackScreen() {
  return (
    <RootStack.Navigator headerMode="none">
      <RootStack.Screen name="SplashScreen" component={SplashScreen}/>
      <RootStack.Screen name="SignInScreen" component={SignInScreen}/>
      <RootStack.Screen name="SignUpScreen" component={SignUpScreen}/>
      <RootStack.Screen name="MainTabScreen" component={MainTabScreen}/>
    </RootStack.Navigator>
  );
}

  export default RootStackScreen;
