/* eslint-disable prettier/prettier */
import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import ButtonGold from './button.gold.component ';

function CustomCallout({eventData, uid}) {

  return (
    <View style={styles.container}>
      <Text> {eventData.sport} with USERNAME</Text>
      {
        eventData.free ?
        <Text>Free to join!</Text>
        :
        <Text>{eventData.price}€</Text>
      }
      <Text>{eventData.datetime}</Text>
      <Text>{eventData.description}</Text>
      <View style={styles.buttonWrapper}>
        <ButtonGold/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: '#5ce1e6',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  text: {
    color: 'whitesmoke',
    fontSize: 25,
    fontWeight: 'bold',
    fontFamily: 'sans-serif-medium',
  },
  buttonWrapper: {
    flex: 0.1,
  },
});

export default CustomCallout;

