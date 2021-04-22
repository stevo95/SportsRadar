/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import { useMutation, useQuery  } from '@apollo/client';
import {View, StyleSheet, PermissionsAndroid, Dimensions, Text} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView from 'react-native-maps';
import Spinner from 'react-native-spinkit';
import CreateEventModal from '../../components/modal.popup.component';
import EventInfoModal from '../../components/eventInfo.modal.popup.component';

import {  ADD_EVENT } from '../../GraphQL/mutationDeclarations';
import {  GET_ALL_EVENTS } from '../../GraphQL/queriesDeclarations';

const mapStyle = require('../../assets/mapStyle.json');

function MapScreen() {
  const [uid, setUid] = useState('2');
  const [loading, setLoading] = useState(true);
  const [newMarkerCoordinates , setNewMarkerCoordinates ] = useState();
  const [createEventModalVisible, setCreateEventModalVisible] = useState(false);
  const [eventModalVisible, setEventModalVisible] = useState(false);

  const [region, setRegion] = useState({
    latitude: 41.39981990644345,
    longitude: 2.196051925420761,
    latitudeDelta: 0.005,
    longitudeDelta: 0.020,
  });

  const [selectedEvent, setSelectedEvent] = useState({
    sport: 'default',
    free: true,
    price: null,
    datetime: '2020/05/20 18:00',
    description: 'default'});
    const [events, setEvents] = useState([{
      _id: 'default',
      date: 'default',
      time:'default',
      creator_id: 'default',
      description: 'default',
      latitude: 41.526,
      longitude: 5.25,
      sport: 'default',
      free: true,
      price: null,
    }]);

    const [userLatLng , setUserLatLng ] = useState({
      latitude: 41.39981990644345,
      longitude: 2.196051925420761,
    });

  const [addEvent, {eventData}] = useMutation(ADD_EVENT);
  const { loadingEvents, loadingError, data } = useQuery(GET_ALL_EVENTS);



  const requestGeolocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'GPS location',
          message: 'We need to access your GPS location so we can search for nearby events',
          buttonNegative: 'Refuse',
          buttonPositive: 'Accept',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('GPS location permission granted');
      } else {
        console.log('GPS location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {


    const geoOptions = {
      enableHighAccuracy: true,
      timeOut: 200,
      maximumAge: 1000,
    };

    async function initializeData() {
      try {
        await requestGeolocationPermission();
        await Geolocation.getCurrentPosition(
          (locationInfo) => {
            setEvents(data.getAllEvents);
            setUserLatLng(prevState => {
              let coordinates = Object.assign({}, prevState);
              coordinates.latitude = locationInfo.coords.latitude;
              coordinates.longitude = locationInfo.coords.longitude;
              return coordinates;
            });
            let userRegion = Object.assign({}, region);
            userRegion.latitude = locationInfo.coords.latitude;
            userRegion.longitude = locationInfo.coords.longitude;
            setLoading(false);
          },
          (error) => {
            console.log(error);
          },
          geoOptions
          );
      }
      catch (err) {
        console.log(err);
      }
    }
    initializeData();
  }, []);

  function openModal(coordinates) {
    const newCoordinates = Object.assign({}, coordinates);
    setNewMarkerCoordinates(newCoordinates);
    setCreateEventModalVisible(true);
  }

  async function createHandler(markerData) {
    markerData.creatorId = uid;
    console.log('marker data in createHandler: ');
    console.log(markerData);
    const datahere = await addEvent({ variables: {
      addEventDescription: markerData.description,
      addEventDate: markerData.date,
      addEventTime: markerData.time,
      addEventLatitude: markerData.latitude,
      addEventLongitude: markerData.longitude,
      addEventSport: markerData.sport,
      addEventFree: markerData.free,
      addEventPrice: markerData.price,
      addCreator_id: markerData.creatorId,
    }});
    console.log('_______________________________');
    console.log('eventData: ');
    console.log(eventData);
    console.log('returned data: ');
    console.log(datahere.updatedList);
    console.log('_______________________________');
    await setEvents(prevState => {
      const newState = eventData;
      console.log('_______________________________');
      console.log('eventData: ');
      console.log(newState);

      if (eventData === undefined) {
        return prevState;
      } else {
        return newState;
      }
    });
    setCreateEventModalVisible(false);
  }

  function eventOnPress(idx) {
    setSelectedEvent(data.getAllEvents[idx]);
    setEventModalVisible(true);
  }

  function renderEvents() {
    if (!loading && data !== undefined) {
      const eventsList = events.map((marker, idx) => {
        return (
          <MapView.Marker
            key = {idx}
            onPress = {() => eventOnPress(idx)}
            image={require('../../assets/event-locator.png')}
            coordinate= {{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
          />
        );
      });
      return eventsList;
    } else {
      return;
    }
  }

  function renderEventInfo(event) {
    return (
      <EventInfoModal
        visible={eventModalVisible}
        visibleSetter = {setEventModalVisible}
        eventData = {event}
      />
    );
  }

  return (
    <View style={styles.container}>
      {
        loading ?
          <Spinner style={styles.spinner} type={'Circle'} color={'gold'}/>
        :
        <View style={styles.MapViewContainer}>
          <CreateEventModal
            visible={createEventModalVisible}
            visibleSetter = {setCreateEventModalVisible}
            onClickButton = {createHandler}
            newMarkerCoordinates = {newMarkerCoordinates}
          />
          {renderEventInfo(selectedEvent)}
          <MapView
            style={styles.map}
            customMapStyle={mapStyle}
            onLongPress={(event) => openModal(event.nativeEvent.coordinate)}
            initialRegion={{
            latitude: userLatLng.latitude,
            longitude: userLatLng.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
          >
            {renderEvents()}
            <MapView.Marker
              image={require('../../assets/user.png')}
              coordinate= {{
                latitude: userLatLng.latitude,
                longitude: userLatLng.longitude,
              }}
            />
          </MapView>
        </View>
      }
    </View>
  );
}

const {height} = Dimensions.get('screen');
const height_loader = height * 0.25;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5ce1e6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  MapViewContainer: {
    flex: 1,
    alignSelf: 'stretch',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    flex:1,
    alignSelf: 'stretch',
    padding: 5,
  },
  userLocation: {
    width: 20,
    height: 20,
    backgroundColor: 'red',
  },
  spinner: {
    width: height_loader,
    height: height_loader,
  },
  callout: {
    flex: 1,
  },
});

export default MapScreen;
