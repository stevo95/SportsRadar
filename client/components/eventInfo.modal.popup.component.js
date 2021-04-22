/* eslint-disable curly */
/* eslint-disable prettier/prettier */
import React from 'react';
import {Text, StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import Modal from 'react-native-modal';

import ButtonGold from './button.gold.component ';

function EventInfoModalPopup({visible, visibleSetter, eventData}) {

  function hideModal() {
    visibleSetter(false);
  }

  return (
    <Modal
      isVisible={visible}
      style={styles.modal}
      onBackdropPress={hideModal}
      onBackButtonPress={hideModal}
      backdropTransitionInTiming= {1000}
      backdropTransitionOutTiming= {1000}
    >
      <TouchableOpacity style={styles.profileContainer}>
          <Image
            source={require('../assets/user.png')}
            style = {styles.image}
          />
      </TouchableOpacity>
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
    </Modal>
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
    profileContainer: {
      height: 150,
      width: 150,
      borderRadius: 75,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: '#f2f2f2',
      // backgroundColor: 'black',
    },
    image: {
      height: 80,
      width: 100,
      alignSelf: 'center',
      resizeMode: 'cover',
    },
    imgContainer: {
      flex: 1,
    },
  });

export default EventInfoModalPopup;
