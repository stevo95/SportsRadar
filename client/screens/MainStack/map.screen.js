/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import { useMutation, useQuery  } from '@apollo/client';
import {View, StyleSheet, PermissionsAndroid, Dimensions, Text} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView from 'react-native-maps';
import Spinner from 'react-native-spinkit';
import CreateEventModal from '../../components/modal.popup.component';
import CustomCallout from '../../components/callout.component';
import EventInfoModal from '../../components/eventInfo.modal.popup.component';

const mapStyle = require('../../assets/mapStyle.json');
import {  ADD_EVENT } from '../../GraphQL/mutationDeclarations';
import {  GET_ALL_EVENTS } from '../../GraphQL/queriesDeclarations';
// import Geolocation from '@react-native-community/geolocation';
// types: ['CircleFlip', 'Bounce', 'Wave', 'WanderingCubes', 'Pulse', 'ChasingDots', 'ThreeBounce', 'Circle', '9CubeGrid', 'WordPress', 'FadingCircle', 'FadingCircleAlt', 'Arc', 'ArcAlt'],

function MapScreen() {
  const [uid, setUid] = useState('1');
  const [loading, setLoading] = useState(true);
  const [newMarkerCoordinates , setNewMarkerCoordinates ] = useState(); // {latitude: 41.39981990644345, longitude: 2.196051925420761}
  const [region, setRegion] = useState({latitude: 41.39981990644345, longitude: 2.196051925420761, latitudeDelta: 0.005, longitudeDelta: 0.020});
  const [createEventModalVisible, setCreateEventModalVisible] = useState(false);
  const [eventModalVisible, setEventModalVisible] = useState(false);

  const [userLongitude , setUserLongitude ] = useState(0);
  const [userLatitude , setUserLatitude ] = useState(0);
  const [userLatLng , setUserLatLng ] = useState({latitude: 41.39981990644345, longitude: 2.196051925420761});

  const [events, setEvents] = useState([]);
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

  function createHandler(markerData) {
    markerData.creatorId = uid;
    setEvents(prevState => {
      const newState = [...prevState, markerData];
      console.log(newState);
      addEvent({ variables: {
        addEventDescription: markerData.description,
        addEventDatetime: markerData.date,
        addEventLatitude: markerData.latitude,
        addEventLongitude: markerData.longitude,
        addEventSport: markerData.sport,
        addEventFree: markerData.free,
        addEventPrice: markerData.price,
        addCreator_id: markerData.creatorId,
      }});
      return newState;
    });
    setCreateEventModalVisible(false);
  }

  function renderEvents() {
    if (!loading && data.getAllEvents.length > 0) {
      const eventsList = data.getAllEvents.map((marker, idx) => {
        return (
          <MapView.Marker
            key = {idx}
            image={require('../../assets/event-locator.png')}
            coordinate= {{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
          >
            <MapView.Callout
              tooltip={true}
              style = {styles.callout}
            >
              <CustomCallout
                eventData = {marker}
              />
            </MapView.Callout>
          </MapView.Marker>
        );
      });
      return eventsList;
    } else {
      console.log('loading events');
      return;
    }
  }

  function renderEventInfo() {
    return (
      <EventInfoModal
        visible={eventModalVisible}
        visibleSetter = {setEventModalVisible}
        onClickButton = {createHandler}
        newMarkerCoordinates = {newMarkerCoordinates}
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
