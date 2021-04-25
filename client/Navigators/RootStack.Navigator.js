/* eslint-disable prettier/prettier */
import React, { useEffect} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/LoginStack/Splash.screen';
import SignInScreen from '../screens/LoginStack/SignIn.screen';
import SignUpScreen from '../screens/LoginStack/SignUp.screen';
import MainTabScreen from './MainTab.Navigator';
import ProfileStack from './ProfileStack.Navigator';

const RootStack = createStackNavigator();


function RootStackScreen() {
  return (
    <RootStack.Navigator headerMode="none">
      <RootStack.Screen name="SplashScreen" component={SplashScreen}/>
      <RootStack.Screen name="SignInScreen" component={SignInScreen}/>
      <RootStack.Screen name="SignUpScreen" component={SignUpScreen}/>
      <RootStack.Screen name="ProfileStack" component={ProfileStack}/>
      <RootStack.Screen name="MainTabScreen" component={MainTabScreen}/>
    </RootStack.Navigator>
  );
}

  export default RootStackScreen;
