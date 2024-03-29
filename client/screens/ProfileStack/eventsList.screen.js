/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, ScrollView, Dimensions, TouchableOpacity} from 'react-native';
import { useMutation, useLazyQuery  } from '@apollo/client';
import {  GET_ALL_EVENTS } from '../../GraphQL/queriesDeclarations';
import {  REMOVE_EVENT, USER_LEFT_EVENT, USER_JOINED_EVENT } from '../../GraphQL/mutationDeclarations';
import Spinner from 'react-native-spinkit';
import ButtonGold from '../../components/button.gold.component ';

function EventsList({ route, navigation }) {

  const {eventsIds, uid} = route.params;
  const [loadingScreen, setLoadingScreen] = useState(true);
  const [events, setEvents] = useState([]);
  const [loadEvents, {data, refetch }] = useLazyQuery(GET_ALL_EVENTS);
  const [removeEvent] = useMutation(REMOVE_EVENT);
  const [userLeft] = useMutation(USER_LEFT_EVENT);
  const [userJoined] = useMutation(USER_JOINED_EVENT);

  const iconMap = {
    Badminton: require('../../assets/SportsIcons/Badminton.png'),
    Baseball: require('../../assets/SportsIcons/Baseball.png'),
    Basketball: require('../../assets/SportsIcons/Basketball.png'),
    Billiard: require('../../assets/SportsIcons/Billiard.png'),
    Bowling: require('../../assets/SportsIcons/Bowling.png'),
    Football: require('../../assets/SportsIcons/Football.png'),
    Golf: require('../../assets/SportsIcons/Golf.png'),
    PingPong: require('../../assets/SportsIcons/PingPong.png'),
    Rugby: require('../../assets/SportsIcons/Rugby.png'),
    Tennis: require('../../assets/SportsIcons/Tennis.png'),
    Volleyball: require('../../assets/SportsIcons/Volleyball.png'),
    Weightlifting: require('../../assets/SportsIcons/Weightlifting.png'),
  };

  useEffect(() => {
    async function initScreen() {
      try {
        await loadEvents();
        if (data !== undefined) {
          let filteredData = data.getAllEvents.filter(event => eventsIds.includes(event._id));
          filteredData.sort(function (a,b) {
            return (a.sport < b.sport) ? -1 : (a.sport > b.sport) ? 1 : 0;
          });
          setEvents(filteredData);
          setLoadingScreen(false);
        }
      } catch (e) {
        console.log(e);
      }
    }
    initScreen();
  }, [data]);

  async function deleteHandler(eventData) {
    try {
      await removeEvent({
        variables: {
          userId: uid,
          eventId: eventData._id,
        },
      });
      await refetch();
    } catch (error) {
      console.log(error);
    }
  }

  async function cancelHandler(eventData) {
    try {
      await userLeft({
        variables: {
          userId: uid,
          eventId: eventData._id,
        },
      });
      await refetch();
    } catch (error) {
      console.log(error);
    }
  }

  async function joinHandler(eventData) {
    try {
      await userJoined({
        variables: {
          userId: uid,
          eventId: eventData._id,
        },
      });
      await refetch();
    } catch (error) {
      console.log(error);
    }
  }

  function renderButton(eventData) {
    if (uid === eventData.creator_id){
      return <ButtonGold text="Delete" color="#990000" onClick={() => deleteHandler(eventData)} />;
    } else {
      if (eventData.attendance !== undefined) return isAttending(eventData);
    }
  }

  function isAttending(eventData) {
    return eventData.attendance.includes(uid) ? (
      <ButtonGold text="Cancel" onClick={() => cancelHandler(eventData)} />
    ) : (
      <ButtonGold text="Join" onClick={() => joinHandler(eventData)} />
    );
  }

  function attendingPress(eventData) {
    navigation.navigate('ProfileStack', {
      screen: 'UsersList',
      params: {
        eventData: eventData,
      },
    });
  }

  function renderEvents() {
    if (!loadingScreen && events !== undefined) {
      const eventsList = events.map((event, idx) => {
        const sport = event.sport;
        return (
          <View key ={idx} style={styles.event_container}>
            <View style={styles.left}>
              <View style={styles.img_container}>
                <Image
                  source={iconMap[sport]}
                  style={styles.img}
                />
              </View>
            </View>
            <View style={styles.right}>
              <Text style={styles.title}>{event.sport}</Text>
              {event.free ? (
                <Text style={styles.text}>Free to join!</Text>
                ) : (
                  <Text style={styles.text}>{event.price}€</Text>
                  )}
              <Text style={styles.text}>{event.date}</Text>
              <Text style={styles.text}>{event.time}</Text>
              <Text style={styles.text}>{event.description}</Text>
              <TouchableOpacity style={styles.attendance} onPress={() => {attendingPress(event)}}>
                <Text style={styles.textAttending}>Attending: </Text>
                <Text style={styles.textAttending}>{event.attendance.length}</Text>
              </TouchableOpacity>
              <View style={styles.buttonWrapper}>
                  {renderButton(event)}
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
          {renderEvents()}
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
  },
  right: {
    width: '60%',
    padding: 5,
  },
  img_container: {
    backgroundColor: 'whitesmoke',
    width: 150,
    height: 150,
    borderRadius: 75,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    height: 90,
    width: 90,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  buttonWrapper: {
    height: 0,
    position:'absolute',
    marginTop: '44%',
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
  attendance: {
    flexDirection: 'row',
  },
  textAttending: {
    color: 'black',
    fontSize: 20,
    fontFamily: 'sans-serif-medium',
    textAlign: 'left',
    marginLeft: '2%',
  },
});

export default EventsList;
