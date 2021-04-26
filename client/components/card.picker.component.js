/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import {Card, CardItem, Body, Picker} from 'native-base';
import {StyleSheet, View} from 'react-native';

function ContentCard({objKey, onChange}) {

  function onSelect(value) {
    console.log('changed');
    onChange(objKey, value);
  }
  return (
    <View style={styles.container}>
      <Card style={{flex:1, backgroundColor: 'gold'}}>
        <CardItem style={{backgroundColor: 'gold'}}>
          <Body style={{flex:1}}>
            <Picker
                note
                mode="dropdown"
                style={styles.picker}
                headerStyle={{ backgroundColor: '#b95dd3' }}
                headerBackButtonTextStyle={{ color: '#fff' }}
                headerTitleStyle={{ color: '#fff' }}
                onValueChange={(value) => {onSelect(value);}}
                selectedValue={'Badminton'}
              >
                <Picker.Item label="Badminton" value="Badminton" />
                <Picker.Item label="Baseball" value="Baseball" />
                <Picker.Item label="Basketball" value="Basketball" />
                <Picker.Item label="Billiard" value="Billiard" />
                <Picker.Item label="Bowling" value="Bowling" />
                <Picker.Item label="Football" value="Football" />
                <Picker.Item label="Golf" value="Golf" />
                <Picker.Item label="PingPong" value="PingPong" />
                <Picker.Item label="Rugby" value="Rugby" />
                <Picker.Item label="Tennis" value="Tennis" />
                <Picker.Item label="Volleyball" value="Volleyball" />
                <Picker.Item label="Weightlifting" value="Weightlifting" />
              </Picker>
          </Body>
        </CardItem>
      </Card>
    </View>
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
    zIndex: 2,
  },
  picker: {
    width: '100%',
    marginLeft: '-5%',
  },
});

export default ContentCard;
