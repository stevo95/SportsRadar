/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {  GET_ALL_EVENTS } from '../../GraphQL/queriesDeclarations';
import {  useQuery  } from '@apollo/client';

function MainScreen() {
  const { loadingEvents, loadingError, data } = useQuery(GET_ALL_EVENTS);


  function test() {
    console.log('click');
    console.log(data);
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
