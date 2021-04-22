/* eslint-disable curly */
/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {Text, StyleSheet, View, TouchableOpacity, ScrollView} from 'react-native';
import Modal from 'react-native-modal';
import { Toast } from 'native-base';
import ButtonLarge from '../components/button.gold.component ';
import ContentCard from '../components/card.component';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import DateTimePicker from '@react-native-community/datetimepicker';
import dateFormat from 'dateformat';

function ModalPopup({visible, visibleSetter, onClickButton, newMarkerCoordinates}) {
  const [freeChecked, setFreeChecked] = useState(true);
  const [paidChecked, setPaidChecked] = useState(false);
  const [markerData, setMarkerData] = useState({});
  const [date, setDate] = useState('Click to set date!');
  const [time, setTime] = useState('Click to set time!');  //new Date(Date.now())
  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);

  function hideModal() {
    visibleSetter(false);
  }

  function onCreate() {
    setMarkerData(previous => {
      let newMarker = Object.assign(previous, newMarkerCoordinates);
      newMarker = Object.assign(newMarker, {date: date});
      if (freeChecked) {
        newMarker = Object.assign(newMarker, {price: null});
      }
      return newMarker;
    });

    if (freeChecked && paidChecked) {
      Toast.show({
        text: 'Only one of price options must be checked',
        duration: 2000,
        position: 'bottom',
      });
    } else if (!freeChecked && !paidChecked) {
      Toast.show({
        text: 'One of price options must be checked',
        duration: 2000,
        position: 'bottom',
      });
    } else {
      setMarkerData(previous => {
        const newMarker = Object.assign(previous, {free: freeChecked});
        return newMarker;
      });
      onClickButton(markerData);
      setMarkerData({});
    }
  }

  function Price() {
    if (paidChecked) {
      return (
        <View style={styles.smallCardWrapper}>
          <Text style={styles.cardTitle}>Price</Text>
          <ContentCard
            placeholderText= "Enter your price per person..."
            objKey = "price"
            onChange = {userInputHandler}
          />
        </View>
      );
    }
  }

  const onChangeDate = (event, selectedDate) => {
    const formattedDate = dateFormat(selectedDate, 'fullDate');
    console.log('date changed');
    console.log(formattedDate);
    if (event.type === 'dismissed') {
      setShowDate(false);
      setShowTime(false);
    } else if (event.type === 'set') {
      setDate(formattedDate);
      setShowDate(false);
    } else {
      setShowDate(false);
      setShowTime(false);
    }
  };

  const onChangeTime = (event, selectedTime) => {
    const formattedTime = dateFormat(selectedTime, 'HH:MM');
    console.log('time changed');
    console.log(formattedTime);
    if (event.type === 'dismissed') {
      setShowDate(false);
      setShowTime(false);
    } else if (event.type === 'set') {
      setTime(formattedTime);
      setShowTime(false);
    } else {
      setShowDate(false);
      setShowTime(false);
    }
  };

  function dateTimePicker() {
    if (showDate) {
      console.log('rendering date');
      return (
        <DateTimePicker
          style = {styles.dateTime}
          testID="dateTimePicker"
          value={new Date(Date.now())}
          mode={'date'}
          is24Hour={true}
          display="spinner"
          onChange={onChangeDate}
      />
      );
    } else if (showTime) {
      console.log('rendering time');
      return (
        <DateTimePicker
          style = {styles.dateTime}
          testID="dateTimePicker"
          value={new Date(Date.now())}
          mode={'time'}
          is24Hour={true}
          display="spinner"
          onChange={onChangeTime}
      />
      );
    }
  }

  function userInputHandler(key, value) {
    const newInput = {
      [key]: value,
    };

    setMarkerData(previous => {
      const newMarker = Object.assign(previous, newInput);
      return newMarker;
    });
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
      <View style={styles.modalContentContainer}>
        <ScrollView contentContainerStyle={styles.cardContainer}>
          <Text style={styles.title}>Add new marker</Text>
          <View style={styles.checkboxContainer}>
            <BouncyCheckbox
              size = {25}
              text="Free"
              fillColor="gold"
              unfillColor="khaki"
              isChecked={freeChecked}
              onPress={(isChecked) => {setFreeChecked(isChecked);}}
            />
            <BouncyCheckbox
              size = {25}
              text="Paid"
              fillColor="gold"
              unfillColor="khaki"
              isChecked={paidChecked}
              onPress={(isChecked) => {setPaidChecked(isChecked);}}
            />
          </View>
          {Price()}
          <View style={styles.smallCardWrapper}>
            <Text style={styles.cardTitle}>Sport</Text>
            <ContentCard
              placeholderText= "Describe the activity..."
              objKey= "sport"
              onChange = {userInputHandler}
            />
          </View>
          <View style = {styles.bigCardWrapper}>
            <Text style={styles.cardTitle}>Description</Text>
              <ContentCard
                placeholderText= "What to bring, what to expect..."
                objKey= "description"
                onChange = {userInputHandler}
              />
          </View>

        <Text style={styles.cardTitle}>Date & Time</Text>
        <TouchableOpacity style = {styles.pickDateButton} onPress = {() => setShowDate(true)}>
          <Text style = {styles.pickDateButton}>{date}</Text>
        </TouchableOpacity>
        <TouchableOpacity style = {styles.pickDateButton} onPress = {() => setShowTime(true)}>
          <Text style = {styles.pickDateButton}>{time}</Text>
        </TouchableOpacity>
        {dateTimePicker()}

        </ScrollView>
        <View style={styles.buttonContainer}>
            <ButtonLarge
              text= "CREATE"
              onClick= {onCreate}
              />
        </View>
      </View>
  </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    zIndex: 1,
    width: '80%',
    marginBottom: '30%',
    alignSelf: 'center',
    backgroundColor: '#5ce1e6',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  modalContentContainer: {
    flex: 1,
    zIndex: 2,
    justifyContent: 'space-between',
  },
  cardContainer: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  checkboxContainer: {
    alignSelf: 'stretch',
    flexDirection:'row',
    justifyContent: 'space-around',
  },
  smallCardWrapper: {
    height: '10%',
    marginBottom: 50,
  },
  bigCardWrapper: {
    height: '15%',
    marginBottom: 50,
  },
  buttonContainer: {
    height: 50,
    width: '80%',
    alignSelf: 'center',
    marginBottom: '10%',
  },
  title: {
    alignSelf: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardTitle: {
    marginLeft: 5,
    fontSize: 15,
    fontWeight: 'bold',
  },
  dateTime: {
    zIndex: 2,
  },
  pickDateButton: {
    backgroundColor: 'transparent',
    marginLeft: 3,
    fontSize: 25,
    fontWeight: 'bold',
  },
});

export default ModalPopup;

