/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Platform, ScrollView, Image} from 'react-native';
import { AirbnbRating } from 'react-native-elements';
import { useLazyQuery  } from '@apollo/client';
import {  GET_USER } from '../../GraphQL/queriesDeclarations';

function ProfileScreen({ route, navigation }) {

  const [loadEvents, {called , loadingError, data }] = useLazyQuery(GET_USER, {
    variables: { getUserId: route.params.userId },
  });

  const [username, setUsername] = useState('');
  const [rating, setRating] = useState(0);
  const [bio, setBio] = useState('');


  useEffect(() => {

    async function initializeData() {
      try {
        await loadEvents();
        setUsername(data.getUser.nickname);
        setBio(data.getUser.bio);
        if (route.params.rating !== null) setRating(data.getUser.rating);
      } catch (error) {
        console.log(error);
      }
    }
    initializeData();
    console.log('user id:');
    console.log(route.params.userId);
  }, [data, route.params.rating, route.params.userId]);

  function userRated(value) {
    console.log(value);
  }

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
        <Text style={styles.username}>{username}</Text>
      </View>
      <View style={styles.card}>
        <View style={styles.bio}>
          <Text>{bio}</Text>
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
          defaultRating = {rating}
          size={50}
          onFinishRating={(userRating) => userRated(userRating)}
          selectedColor = "gold"
          unSelectedColor	= "silver"
        />
          {/* <Text style = {styles.eventsText}>Rating component here</Text> */}
        </View>
      </View>

      <View style={styles.posts}>
          <ScrollView style={styles.contentWrapper}>
            <Text style = {styles.eventsText}>Show all posts</Text>
          </ScrollView>
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
  inputWrapper: {
    borderWidth: 1,
    marginBottom: '5%',
  },
  contentWrapper: {
    borderWidth: 1,
    width: '90%',
    backgroundColor: 'pink',
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
  ratingText: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 5,
    alignSelf: 'center',
  },
  posts: {
    flex: 1,
    marginBottom: '5%',
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
});

export default ProfileScreen;
