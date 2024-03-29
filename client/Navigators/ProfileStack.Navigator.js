/* eslint-disable prettier/prettier */
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import UserProfile from '../screens/ProfileStack/userProfile.screen';
import EventsList from '../screens/ProfileStack/eventsList.screen';
import EditProfile from '../screens/ProfileStack/editProfile.screen';
import UsersList from '../screens/ProfileStack/userList.screen';


const RootStack = createStackNavigator();


function ProfileStack() {
  return (
    <RootStack.Navigator headerMode="none">
      <RootStack.Screen name="UserProfile" component={UserProfile}/>
      <RootStack.Screen name="EventsList" component={EventsList}/>
      <RootStack.Screen name="EditProfile" component={EditProfile}/>
      <RootStack.Screen name="UsersList" component={UsersList}/>
    </RootStack.Navigator>
  );
}

  export default ProfileStack;
