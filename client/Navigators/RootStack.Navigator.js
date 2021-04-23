/* eslint-disable prettier/prettier */
import React, { useEffect} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import SplashScreen from '../screens/LoginStack/Splash.screen';
import SignInScreen from '../screens/LoginStack/SignIn.screen';
import SignUpScreen from '../screens/LoginStack/SignUp.screen';
import MainTabScreen from './MainTab.Navigator';
import ProfileStack from './ProfileStack.Navigator';

const RootStack = createStackNavigator();


function RootStackScreen() {


  useEffect(() => {
    async function storeAuthData() {
      try {
        const jsonValue = JSON.stringify({uid: '3', username: 'SailorJerry'});
        await AsyncStorage.setItem('authInfo', jsonValue);
      } catch (error) {
        console.log(error);
      }
    };
    storeAuthData();
  }, []);


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
