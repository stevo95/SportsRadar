/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

function MainScreen() {


  function test() {
    console.log('click');
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
