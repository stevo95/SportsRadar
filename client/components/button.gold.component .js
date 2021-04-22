/* eslint-disable prettier/prettier */
import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';

function ButtonLarge({onClick, text}) {

  return (
    <TouchableOpacity
      onPress={onClick}
      style={styles.container}
    >
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'gold',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    borderRadius: 25,
  },
  text: {
    color: 'whitesmoke',
    fontSize: 25,
    fontWeight: 'bold',
    fontFamily: 'sans-serif-medium',
  },
});

export default ButtonLarge;

