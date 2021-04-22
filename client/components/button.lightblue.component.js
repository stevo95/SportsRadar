/* eslint-disable prettier/prettier */
import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';

function ButtonLightBlue({onClick, text, width}) {

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
    backgroundColor: '#5ce1e6',
    height: '100%',
    width: '49%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    borderRadius: 25,
  },
  text: {
    color: 'whitesmoke',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'sans-serif-medium',
  },
});

export default ButtonLightBlue;

