/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Icon} from 'native-base';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';

import MainScreen from '../screens/MainStack/main.screen';
import ProfileScreen from '../screens/MainStack/profile.screen';
import MapScreen from '../screens/MainStack/map.screen';

const MainTab = createBottomTabNavigator();

function CustomTabBarButton({children, onPress}) {

  return (
    <TouchableOpacity
      onPress={onPress}
      style = {styles.customButton}
    >
      <View style={styles.customButtonView}>
        {children}
      </View>
    </TouchableOpacity>
  );
}

function MainTabScreen({authInfo}) {



  return (
    <MainTab.Navigator
      tabBarOptions={{
        showLabel:false,
        keyboardHidesTabBar: true,
        style: {
          // position: 'absolute',
          // bottom: 25,
          // elevation: 0,
          backgroundColor: '#5ce1e6',
          // borderTopRightRadius: 25,
          // borderTopLeftRadius: 25,
          height: 70,
        },
      }}
    >
      <MainTab.Screen name="Home" component={MainScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.iconContainer}>
              <Icon
                type="FontAwesome"
                name= "map"
                style={{
                  color: focused ? 'black' : 'grey',
                }}
              />
              <Text style={{color: focused ? 'black' : 'grey'}}>MAIN</Text>
            </View>
          ),
        }}
        />

      <MainTab.Screen name="Map" component={MapScreen}
        options={{
          // headerShown: false,
          tabBarIcon: ({focused}) => (
            <View style={styles.iconContainer}>
              <Icon
                type="FontAwesome"
                name= "globe"
                style={{
                  color: focused ? 'black' : 'grey'}}
              />
              {/* <Text style={{color: focused ? '#5ce1e6' : 'grey', fontWeight: 'bold'}}>MAP</Text> */}
            </View>
          ),
          tabBarButton: (props) => (
            <CustomTabBarButton {...props} />
          ),
        }}
        />

      <MainTab.Screen
        name="Profile"
        component={ProfileScreen}
        authInfo= {authInfo}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.iconContainer}>
              <Icon
                name= "ios-clipboard"
                style={{
                  color: focused ? 'black' : 'grey',
                }}
              />
              <Text style={{color: focused ? 'black' : 'black'}}>PROFILE</Text>
            </View>
          ),
        }}
        />

    </MainTab.Navigator>
  );
}

const styles = StyleSheet.create({
  icon: {
    color:'gold',
  },
  iconContainer: {
    alignItems: 'center',
  },
  title: {
    color: 'gold',
  },
  customButton: {
    top: -25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation:  5,
  },
  customButtonView: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'gold',
  },
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation:  5,
  },
});



  export default MainTabScreen;
