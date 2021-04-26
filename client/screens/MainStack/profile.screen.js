/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {View, Text, StyleSheet, TouchableOpacity, Platform, ScrollView, Image, TextInput, Dimensions} from 'react-native';
import { Icon } from 'native-base';
import { AirbnbRating } from 'react-native-ratings';
import { useLazyQuery, useMutation  } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {  GET_USER } from '../../GraphQL/queriesDeclarations';
import {  ADD_POST } from '../../GraphQL/mutationDeclarations';
import PostsDashboard from '../../components/posts.dashboard.component';
import Spinner from 'react-native-spinkit';
import ModalPopup from '../../components/edit.bio.modal.component';

function ProfileScreen({navigation}) {
  const [userInfo, setUserInfo] = useState({nickname: 'Username', events_attending: [], events_hosting: [], bio: '', rating: 0.5, posts: []});
  const [userId, setUserId] = useState('1');
  const [modalVisible, setModalVisible] = useState(false);
  const [post, setPost] = useState();
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [addPost] = useMutation(ADD_POST);
  const [loadUser, {  data, called, refetch }] = useLazyQuery(GET_USER, {
    variables: { getUserId: userId },
  });

  async function callRefetch() {
    try {
      await loadUser();
      if (called) {
        await refetch();
      }
    } catch (err) {
      console.log(err);
    }
  }
  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;
      async function refetchData() {
        try {
          if (isActive) await callRefetch();
        } catch (err) {
          console.log(err);
        }
      }
      refetchData();
      return () => {
        isActive = false;
      };
    }, [data])
  );

  useEffect(() => {
    async function initScreen() {
      try {
        const authData = await AsyncStorage.getItem('authInfo');
        const parsedData = authData !== null ? JSON.parse(authData) : null;
        await setUserId(parsedData.uid);
        if (data !== undefined) setUserInfo(data.getUser);
      } catch (err) {
        console.log(err);
      }
    }
    initScreen();
    if (userInfo.nickname !== 'Username' && data !== undefined) setLoadingStatus(false);
  }, [data, userInfo]);

  function onTextInput(value) {
    setPost(value);
  }

  function rate(value) {
    console.log(value);
    console.log('rate');
  }

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
  async function sendPost() {
    try {
      await addPost({
        variables: {
          userId: userId,
          post: post,
        },
      });
      await refetch();
      setPost('');
    } catch (err) {
      console.log(err);
    }
  }

  function editBio() {
    setModalVisible(true);
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
          <ModalPopup
            visible={modalVisible}
            visibleSetter = {setModalVisible}
            value={userInfo.bio}
            uid={userId}
            refetchUser={refetch}
          />
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
            <TouchableOpacity
              style={styles.editButton}
              onPress={editBio}
            >
              <Text style={styles.btnText}>Edit Bio</Text>
            </TouchableOpacity>
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
              onFinishRating={(value) => rate(value)}
            />
            </View>
          </View>

          <View style={styles.card}>
            <View style={styles.content}>
              <View style={styles.inputWrapper}>
                <TextInput
                  placeholder={'Write a post!'}
                  textAlignVertical= "top"
                  style={styles.postField}
                  onChangeText={(value) => onTextInput(value)}
                  value = {post}
                  multiline={true}
                />
                <TouchableOpacity
                  style={styles.goButton}
                  onPress={sendPost}
                >
                  <Icon name="ios-send"/>
                </TouchableOpacity>
              </View>
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
    marginBottom: 20,
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
    backgroundColor: 'gold',
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
});

export default ProfileScreen;
