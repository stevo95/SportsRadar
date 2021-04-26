/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {View, Text, StyleSheet, TouchableOpacity, Platform, ScrollView, Image} from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import { useLazyQuery  } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {  GET_USER } from '../../GraphQL/queriesDeclarations';

function ProfileScreen() {
  const [userInfo, setUserInfo] = useState({nickname: 'Username', events_attending: [], events_hosting: [], bio: ''});
  const [userId, setUserId] = useState('1');

  const [loadUser, {loading , data }] = useLazyQuery(GET_USER, {
    variables: { getUserId: userId },
  });

  useEffect(() => {
    async function initData() {
      try {
        const authData = await AsyncStorage.getItem('authInfo');
        const parsedData = authData !== null ? JSON.parse(authData) : null;
        await setUserId(parsedData.uid);
        await loadUser();
        if (data) setUserInfo(data.getUser);
      } catch (e) {
        console.log(e);
      }
    }
    initData();
  }, [data]);

  const hosting = `${userInfo.events_hosting.length}`;
  const attending = `${userInfo.events_attending.length}`;

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
        <Text style={styles.username}>{userInfo.nickname}</Text>
      </View>
      <View style={styles.card}>
        <View style={styles.bio}>
          <Text>{userInfo.bio}</Text>
        </View>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.btnText}>Edit profile</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.card}>
        <View style={styles.eventsInfo}>
          <TouchableOpacity style={styles.eventCounter}>
            <Text style = {styles.eventsText}>Hosting: </Text>
            <Text style = {styles.eventsText}>{hosting}</Text>
          </TouchableOpacity>
          <Text style = {styles.divider}>|</Text>
          <TouchableOpacity style={styles.eventCounter}>
            <Text style = {styles.eventsText}>Attending: </Text>
            <Text style = {styles.eventsText}>{attending}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.rating}>
        <AirbnbRating
          style={styles.ratingStars}
          ratingCount={5}
          size={50}
          showRating={false}
          selectedColor = "gold"
          unSelectedColor	= "whitesmoke"
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
    width: '95%',
    // backgroundColor: 'pink',
  },
  eventsInfo: {
    flexDirection: 'row',
    justifyContent:'space-between',
    // backgroundColor: 'pink',
    width: '95%',
  },
  eventsText: {
    color:'black',
    fontWeight: 'bold',
    fontSize: 20,
  },
  rating: {
    width: '95%',
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
  },
  eventCounter: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '49%',
  },
  divider: {
    color:'grey',
    fontSize: 20,
  },
  editButton: {
    width: '95%',
    height: 30,
    backgroundColor: 'whitesmoke',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: 'black',
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
