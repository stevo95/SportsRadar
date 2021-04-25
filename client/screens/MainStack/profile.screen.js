/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {View, Text, StyleSheet, TouchableOpacity, Platform, ScrollView, Image} from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import { useLazyQuery  } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {  GET_USER } from '../../GraphQL/queriesDeclarations';

function ProfileScreen() {
  const [userId, setUserId] = useState('0');

  const [loadUser, {data, refetch }] = useLazyQuery(GET_USER, {
    variables: { getUserId: userId },
  });


  useEffect(() => {
    async function initData() {
      try {
        const authData = await AsyncStorage.getItem('authInfo');
        const parsedData = authData !== null ? JSON.parse(authData) : null;
        console.log('in profile screen');
        console.log(parsedData.uid);
        console.log(parsedData.username);
        await setUserId(parsedData.uid);
        await loadUser();
        console.log(data);
      } catch (e) {
        console.log(e);
      }
    }
    initData();
  }, [data]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <TouchableOpacity style={styles.profilePictureContainer}>
          <Image
            style={styles.img}
            source={{
              uri: 'https://i.pinimg.com/originals/ee/85/64/ee8564ee5234e650aadf4c19b6d7c753.jpg',
            }}
          />
        </TouchableOpacity>
        <Text style={styles.username}>User name</Text>
      </View>
      <View style={styles.card}>
        <View style={styles.bio}>
          <Text>userData</Text>
        </View>
      </View>
      <View style={styles.card}>
        <View style={styles.eventsInfo}>
          <Text style = {styles.eventsText}>Hosting: 5 events</Text>
          <Text style = {styles.eventsText}>|</Text>
          <Text style = {styles.eventsText}>Attending: 2 events</Text>
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.rating}>
        <AirbnbRating
          style={styles.ratingStars}
          ratingCount={5}
          size={50}
          showRating={false}
          selectedColor = 'gold'
          unSelectedColor	= 'silver'
          // ratingBackgroundColor='transparent'
          // onFinishRating={ratingCompleted}
        />
          {/* <Text style = {styles.eventsText}>Rating component here</Text> */}
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.content}>
          <View style={styles.inputWrapper}>
            <Text style = {styles.eventsText}>If user === me show input field to post new post</Text>
          </View>
          <ScrollView style={styles.contentWrapper}>
            <Text style = {styles.eventsText}>Show all posts</Text>
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5ce1e6',
    textAlign: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
  card: {
    // alignSelf: 'stretch',
    width: '95%',
    // backgroundColor: 'rgba(100,100,100,0.1)',
    marginBottom: '5%',
    alignItems: 'center',
    padding: 5,
  },
  profilePictureContainer: {
    height: 250,
    width: 250,
    borderRadius: 125,
    // backgroundColor: 'pink',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bio: {
    width: '90%',
    // backgroundColor: 'pink',
  },
  eventsInfo: {
    flexDirection: 'row',
    justifyContent:'space-between',
    // backgroundColor: 'pink',
    width: '90%',
  },
  eventsText: {
    color:'blue',
    fontWeight: 'bold',
    fontSize: 20,
  },
  rating: {
    width: '90%',
    // backgroundColor: 'pink',
    padding: 5,
  },
  content: {
    // backgroundColor: 'pink',
  },
  inputWrapper: {
    borderWidth: 1,
    marginBottom: '5%',
  },
  contentWrapper: {
    borderWidth: 1,
  },
  img: {
    height: 250,
    width: 250,
    resizeMode: 'cover',
    backgroundColor: 'red',
    borderRadius: 125,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 20,
  }
});

export default ProfileScreen;
