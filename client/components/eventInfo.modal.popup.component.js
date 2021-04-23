import React from 'react';
import {Text, StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import Modal from 'react-native-modal';

import ButtonGold from './button.gold.component ';

function EventInfoModalPopup({
  visible,
  visibleSetter,
  eventData,
  navHandler,
  userId,
}) {
  function hideModal() {
    visibleSetter(false);
  }

  function joinHandler() {
    console.log('click');
  }

  function onPress() {
    navHandler(userId);
  }

  return (
    <Modal
      isVisible={visible}
      style={styles.modal}
      onBackdropPress={hideModal}
      onBackButtonPress={hideModal}
      backdropTransitionInTiming={1000}
      backdropTransitionOutTiming={1000}
      backdropOpacity={0.3}>
      <View style={styles.left}>
        <TouchableOpacity style={styles.profileContainer} onPress={onPress}>
          <Image source={require('../assets/user.png')} style={styles.image} />
        </TouchableOpacity>
      </View>

      <View style={styles.right}>
        <Text style={styles.title}>
          {' '}
          {eventData.sport} with {eventData.creator_username}
        </Text>
        {eventData.free ? (
          <Text style={styles.text}>Free to join!</Text>
        ) : (
          <Text style={styles.text}>{eventData.price}€</Text>
        )}
        <Text style={styles.text}>{eventData.date}</Text>
        <Text style={styles.text}>{eventData.time}</Text>
        <Text style={styles.text}>{eventData.description}</Text>
        <View style={styles.buttonWrapper}>
          <ButtonGold text="Join" onClick={joinHandler} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    zIndex: 1,
    width: '95%',
    marginTop: '130%',
    alignSelf: 'center',
    backgroundColor: '#5ce1e6',
    flexDirection: 'row',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  left: {
    width: '37%',
    justifyContent: 'center',
  },
  right: {
    width: '63%',
    justifyContent: 'space-around',
    borderLeftWidth: 1,
    borderLeftColor: '#f2f2f2',
    alignItems: 'flex-start',
    padding: 3,
  },
  profileContainer: {
    height: 150,
    width: 150,
    borderRadius: 75,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#f2f2f2',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'left',
  },
  text: {
    color: 'whitesmoke',
    fontSize: 20,
    fontFamily: 'sans-serif-medium',
    textAlign: 'left',
    marginLeft: '2%',
  },
  buttonWrapper: {
    height: '15%',
    marginBottom: '10%',
    width: '60%',
    alignSelf: 'center',
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
