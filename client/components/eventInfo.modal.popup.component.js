/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {Text, StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import {useQuery} from '@apollo/client';
import {useMutation} from '@apollo/client';
import Modal from 'react-native-modal';
import {GET_USER} from '../GraphQL/queriesDeclarations';

import ButtonGold from './button.gold.component ';
import {
  USER_JOINED_EVENT,
  USER_LEFT_EVENT,
  REMOVE_EVENT,
} from '../GraphQL/mutationDeclarations';

function EventInfoModalPopup({
  visible,
  visibleSetter,
  eventData,
  navHandler,
  navAttendingHandler,
  uid,
  refetchEvents,
}) {
  const [userJoined] = useMutation(USER_JOINED_EVENT);
  const [userLeft] = useMutation(USER_LEFT_EVENT);
  const [removeEvent] = useMutation(REMOVE_EVENT);
  const [joined, setJoined] = useState(false);
  const [imgUrl, setImgUrl] = useState('http');
  const [attending, setAttending] = useState(eventData.attendance.length);
  const [attendance, setAttendance] = useState(eventData.attendance);
  const {data} = useQuery(GET_USER, {
    variables: {getUserId: eventData.creator_id},
  });

  useEffect(() => {
    if (data !== undefined) setImgUrl(data.getUser.img_url);
    if (attendance !== undefined) {
      if (attendance.includes(uid)) {
        setJoined(true);
      }
    }
  }, [joined, data]);

  function hideModal() {
    visibleSetter(false);
  }

  async function updateEvents(eventList) {
    // setEvents(eventList);
    refetchEvents();
  }

  function openProfile() {
    navHandler(eventData.creator_id);
  }

  function attendingPress() {
    navAttendingHandler(eventData);
  }

  async function deleteHandler() {
    try {
      const removeResponse = await removeEvent({
        variables: {
          userId: uid,
          eventId: eventData._id,
        },
      });
      await updateEvents(removeResponse.data.deleteEvent.updatedList);
      hideModal();
    } catch (error) {
      console.log(error);
    }
  }

  async function joinHandler() {
    try {
      const updatedEvents = await userJoined({
        variables: {
          userId: uid,
          eventId: eventData._id,
        },
      });
      setAttending(prevState => {
        return prevState + 1;
      });
      await updateEvents(updatedEvents.data.userJoinedEvent.updatedList);
      setJoined(true);
    } catch (error) {
      console.log(error);
    }
  }

  async function cancelHandler() {
    try {
      const updatedEvents = await userLeft({
        variables: {
          userId: uid,
          eventId: eventData._id,
        },
      });
      setAttending(prevState => {
        return prevState - 1;
      });
      setAttendance(prevState => {
        const copy = [...prevState];
        const idx = copy.indexOf(uid);
        copy.splice(idx,1);
        return copy;
      });
      setJoined(false);
      await updateEvents();
    } catch (error) {
      console.log(error);
    }
  }

  function renderButton() {
    if (uid === eventData.creator_id){
      return (
        <ButtonGold text="Delete" color="#990000" onClick={deleteHandler} />
      );
    } else {
      if (eventData.attendance !== undefined) return isAttending();
    }
  }

  function isAttending() {
    return joined ? (
      <ButtonGold text="Cancel" onClick={cancelHandler} />
    ) : (
      <ButtonGold text="Join" onClick={joinHandler} />
    );
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
        <TouchableOpacity style={styles.profileContainer} onPress={openProfile}>
          <Image source={{uri: imgUrl}} style={styles.image} />
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
        <TouchableOpacity style={styles.attendance} onPress={attendingPress}>
          <Text style={styles.textAttending}>Attending: </Text>
          <Text style={styles.textAttending}>{attending}</Text>
        </TouchableOpacity>
        <View style={styles.buttonWrapper}>{renderButton()}</View>
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
    height: 150,
    width: 150,
    alignSelf: 'center',
    resizeMode: 'cover',
    borderRadius: 75,
  },
  imgContainer: {
    flex: 1,
    backgroundColor: 'whitesmoke',
  },
  attendance: {
    flexDirection: 'row',
  },
  textAttending: {
    color: 'black',
    fontSize: 20,
    fontFamily: 'sans-serif-medium',
    textAlign: 'left',
    marginLeft: '2%',
  },
});

export default EventInfoModalPopup;
