/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, ScrollView, Dimensions, ImageBackground} from 'react-native';
import { useLazyQuery  } from '@apollo/client';
import {  GET_USER_LIST } from '../../GraphQL/queriesDeclarations';
import Spinner from 'react-native-spinkit';
import { AirbnbRating } from 'react-native-ratings';

function UsersList({ route, navigation }) {

  const {eventData} = route.params;
  const [loadingScreen, setLoadingScreen] = useState(true);
  const [users, setUsers] = useState([]);
  const [getUserList, {called, data}] = useLazyQuery(GET_USER_LIST, {
    variables: { getUserListIds: eventData.attendance },
  });

  useEffect(() => {
    async function initScreen() {
      console.log(eventData.attendance);
      try {
        if (data === undefined) {
          console.log('fetching data');
          await getUserList();
          console.log(called);
        }
        console.log('data:');
        console.log(data.getUserList);
        if (data !== undefined) {
          console.log('setting data');
          setUsers(data.getUserList);
          setLoadingScreen(false);
        }
      } catch (e) {
        console.log('error');
        console.log(e);
      }
    }
    initScreen();
  }, [data]);



  function renderUsers() {
    if (!loadingScreen && users !== undefined) {
      const eventsList = users.map((user, idx) => {
        return (
          <View key ={idx} style={styles.event_container}>
            <View style={styles.left}>
              <View style={styles.img_container}>
                <ImageBackground 
                  source={{
                    uri: 'http://assets.stickpng.com/thumbs/58909b545236a4e0f6e2f975.png',
                  }}
                  style={styles.img}
                />
                {/* <Image
                  // source={user.img_url}
                  source={{
                    uri: 'http://assets.stickpng.com/thumbs/58909b545236a4e0f6e2f975.png',
                  }}
                  style={styles.img}
                /> */}
              </View>
            </View>
            <View style={styles.right}>
              <View style={styles.top}>
                <Text style={styles.topTitle}>{user.nickname}</Text>
              </View>
              <View style={styles.center}/>
              <View style={styles.bottom}>
              <AirbnbRating
                defaultRating={user.rating}
                showRating={false}
              />
              </View>
            </View>

          </View>
          );
        });
      return eventsList;
    }
  }

  return (
    <View style={styles.container}>
    {
      loadingScreen ?
      <Spinner style={styles.spinStyle} type={'Circle'} color={'gold'}/>
      :
      <View style={styles.wrapper}>
        <ScrollView contentContainerStyle={styles.scroll}>
          {renderUsers()}
        </ScrollView>
      </View>
    }
    </View>
  );
  }

const {height} = Dimensions.get('screen');
const height_loader = height * 0.25;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5ce1e6',
    textAlign: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  justifyContent: 'center',
  },
  wrapper: {
    flex: 1,
    alignSelf: 'stretch',
  },
  scroll: {
    width: '100%',
  },
  event_container: {
    width: '95%',
    flexDirection:'row',
    alignSelf:'center',
    backgroundColor: 'whitesmoke',
    borderRadius: 10,
    padding: 5,
    height: 200,
    marginVertical: 15,
  },
  left: {
    width: '40%',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: 'silver',
  },
  right: {
    width: '60%',
    padding: 5,
    justifyContent: 'space-around',
  },
  img_container: {
    width: 150,
    height: 150,
    borderRadius: 75,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    height: 150,
    width: 150,
    resizeMode: 'cover',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  buttonWrapper: {
    height: 40,
    marginBottom: '10%',
    width: '60%',
    alignSelf: 'center',
  },
  spinStyle: {
    width: height_loader,
    height: height_loader,
    alignSelf:'center',
  },
  text: {
    fontSize: 15,
  },
  center: {
    height: '1%',
    borderBottomWidth: 1,
    borderBottomColor: 'silver',
  },
  top: {
    height: '50%',
    justifyContent: 'center',
  },
  bottom: {
    height: '50%',
    justifyContent: 'center',
  },
  topTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 20,
  },
});

export default UsersList;
