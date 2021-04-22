/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import {Card, CardItem, Body} from 'native-base';
import {TextInput, StyleSheet, View} from 'react-native';

function ContentCard({placeholderText, objKey, onChange}) {

  function onTextInput(value) {
    onChange(objKey, value);
  }
  return (
    // <Container style={{backgroundColor: 'transparent'}}>
    <View style={styles.container}>
      <Card style={{flex:1, backgroundColor: 'gold'}}>
        <CardItem style={{backgroundColor: 'gold'}}>
          <Body style={{flex:1}}>
            <TextInput
              placeholder= {placeholderText}
              multiline= {true}
              style={styles.textInput}
              textAlignVertical= "bottom"
              onChangeText={onTextInput}
            />
          </Body>
        </CardItem>
      </Card>
    </View>
    // </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    width:'100%',
    height: '100%',
  },
  textInput: {
    height:'100%',
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#5ce1e6',
    // borderBottomColor: '#f2f2f2',
    zIndex: 2,
  },
});

export default ContentCard;
