/* eslint-disable prettier/prettier */
import React, { useEffect} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import UserProfile from '../screens/ProfileStack/userProfile.screen';


const RootStack = createStackNavigator();


function ProfileStack() {

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
      <RootStack.Screen name="UserProfile" component={UserProfile}/>
    </RootStack.Navigator>
  );
}

  export default ProfileStack;
