/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {   useMutation  } from '@apollo/client';
import {  ADD_EVENT } from '../../GraphQL/mutationDeclarations';

function MainScreen() {

  const [addEvent, {eventData}] = useMutation(ADD_EVENT);

  // this is a screen where I copy paste my queries / mutation to test with a button click
  // it does nothing, it`s irrelevant and will be deleted ignore it

  const markerData = {
    description: 'football',
    date: 'august',
    time: '18:00',
    latitude: 51.2555618,
    longitude: 25.0856189,
    sport: 'Football',
    free: true,
    price: null,
    creatorId: 1,
    creatorUsername: 'Johnny123',
  };

  function test(markerData) {
    console.log('click');
    try {
      const datahere = addEvent({ variables: {
        addEventDescription: markerData.description,
        addEventDate: markerData.date,
        addEventTime: markerData.time,
        addEventLatitude: markerData.latitude,
        addEventLongitude: markerData.longitude,
        addEventSport: markerData.sport,
        addEventFree: markerData.free,
        addEventPrice: markerData.price,
        addCreator_id: markerData.creatorId,
        addCreator_username: markerData.creatorUsername,
      }});
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <Button
        title="Create user"
        onPress = {test}/>
      <Text>This is a main screen</Text>
      <Text>This is a main screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'whitesmoke',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MainScreen;
