/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Platform, ScrollView, Image, Dimensions} from 'react-native';
import { AirbnbRating } from 'react-native-elements';
import { useLazyQuery  } from '@apollo/client';
import {  GET_USER } from '../../GraphQL/queriesDeclarations';
import PostsDashboard from '../../components/posts.dashboard.component';
import Spinner from 'react-native-spinkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

function ProfileScreen({ route, navigation }) {
  const [loadUser, {data }] = useLazyQuery(GET_USER, {
    variables: { getUserId: route.params.userId },
  });

  const [userInfo, setUserInfo] = useState({nickname: 'Username', events_attending: [], events_hosting: [], bio: '', rating: 0.5, posts: []});
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [userId, setUserId] = useState();


  useEffect(() => {

    async function initializeData() {
      try {
        if (data === undefined) await loadUser();
        if (data !== undefined) setUserInfo(data.getUser);
        if (userId === undefined) {
          const authData = await AsyncStorage.getItem('authInfo');
          const parsedData = authData !== null ? JSON.parse(authData) : null;
          await setUserId(parsedData.uid);
        }
      } catch (error) {
        console.log(error);
      }
    }
    initializeData();
    if (userInfo.nickname !== 'Username' && data !== undefined) setLoadingStatus(false);
  }, [data, userInfo]);

  function onPress(value) {
    if (value === 'Hosting') {
      navigation.navigate('ProfileStack', {
        screen: 'EventsList',
        params: {
          eventsIds: userInfo.events_hosting,
          uid: userId,
        },
      });
    } else if (value === 'Attending') {
      navigation.navigate('ProfileStack', {
        screen: 'EventsList',
        params: {
          eventsIds: userInfo.events_attending,
          uid: userId,
        },
      });
    }
  }


  const hosting = `${userInfo.events_hosting.length}`;
  const attending = `${userInfo.events_attending.length}`;

  return (
    <View style={styles.container}>
      {
        loadingStatus ?
          <Spinner style={styles.spinStyle} type={'Circle'} color={'gold'}/>
        :
        <ScrollView contentContainerStyle={styles.scroll}>
          <View style={styles.card}>
            <TouchableOpacity style={styles.profilePictureContainer}>
              <Image
                  style={styles.img}
                  source={{
                    uri: userInfo.img_url,
                    // uri: 'https://phantom-marca.unidadeditorial.es/b3709fa61a7633b85c74812ac35f35fc/resize/1320/f/jpg/assets/multimedia/imagenes/2021/04/15/16184985433307.jpg',
                  }}
                />
            </TouchableOpacity>
            <Text style={styles.username}>{userInfo.nickname}</Text>
          </View>
          <View style={styles.card}>
            <View style={styles.bio}>
              <Text style={styles.bioText}>{userInfo.bio}</Text>
            </View>
          </View>
          <View style={styles.card}>
            <View style={styles.eventsInfo}>
              <TouchableOpacity style={styles.eventCounter} onPress={()=>onPress('Hosting')}>
                <Text style = {styles.eventsText}>Hosting: </Text>
                <Text style = {styles.eventsText}>{hosting}</Text>
              </TouchableOpacity>
              <Text style = {styles.divider}>|</Text>
              <TouchableOpacity style={styles.eventCounter} onPress={()=>onPress('Attending')}>
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
              defaultRating={userInfo.rating}
            />
            </View>
          </View>

          <View style={styles.card}>
            <View style={styles.content}>
              <PostsDashboard
                posts={userInfo.posts}
              />
            </View>
          </View>
        </ScrollView>
      }
    </View>
  );
}

const {height} = Dimensions.get('screen');
const height_loader = height * 0.25;

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#5ce1e6',
    justifyContent: 'center',
  },
  spinStyle: {
    width: height_loader,
    height: height_loader,
    alignSelf:'center',
  },
  scroll: {
    backgroundColor: '#5ce1e6',
    textAlign: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
  card: {
    width: '95%',
    marginBottom: '5%',
    alignItems: 'center',
    padding: 5,
  },
  profilePictureContainer: {
    height: 250,
    width: 250,
    borderRadius: 125,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bio: {
    width: '95%',
  },
  eventsInfo: {
    flexDirection: 'row',
    justifyContent:'space-between',
    width: '95%',
  },
  eventsText: {
    color:'black',
    fontWeight: 'bold',
    fontSize: 20,
  },
  rating: {
    width: '95%',
    padding: 5,
  },
  content: {
    alignSelf: 'stretch',
  },
  inputWrapper: {
    marginBottom: '3%',
    flexDirection: 'row',
    height: 80,
    justifyContent: 'space-around',
  },
  img: {
    height: 250,
    width: 250,
    resizeMode: 'cover',
    backgroundColor: 'whitesmoke',
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
  postField: {
    width: '90%',
    height: '100%',
    backgroundColor: 'rgba(100,100,100,0.1)',
    borderRadius: 15,
  },
  goButton: {
    width: '8%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bioText: {
    fontSize: 20,
  },
});

export default ProfileScreen;
