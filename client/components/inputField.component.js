/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, TextInput, View, Text} from 'react-native';
import {Icon} from 'native-base';

function InputField({text, iconName, featherIconName, featherColor, onTextInput, inputValue, secure}) {
  const placeholderText = `Enter your ${text}...`;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
      <View style={styles.inputContainer}>
        <Icon
          style={styles.icon}
          type="FontAwesome"
          name={iconName}
        />
        <TextInput
          placeholder={placeholderText}
          secureTextEntry= {secure}
          style={styles.input}
          onChangeText={onTextInput}
          value={inputValue}
          />
        <Icon
          type="Feather"
          name={featherIconName}
          style= {{color: featherColor, fontSize: 15}}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 20,
    flexDirection: 'column',
    alignItems:'flex-start',
    alignSelf: 'stretch',
    marginTop: 50,

  },
  inputContainer: {
    height: '90%',
    flexDirection: 'row',
    alignItems:'center',
    alignSelf: 'stretch',
    borderBottomColor: '#f2f2f2',
    borderBottomWidth: 1,
    marginTop: 10,
  },
  input: {
    width: '80%',
    height: '100%',
    fontSize: 15,
    color: 'black',
    padding: 0,
  },
  icon: {
    width: '8%',
    height: '100%',
    color: '#ffde59',
    textAlignVertical: 'center',
    textAlign: 'center',
    fontSize: 20,
  },
  text: {
    fontWeight: 'bold',
    fontFamily: 'sans-serif-medium',
  },
});

export default InputField;

