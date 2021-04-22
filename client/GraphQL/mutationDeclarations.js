/* eslint-disable prettier/prettier */
import {gql} from '@apollo/client';

const ADD_USER = gql`
  mutation AddUser(
    $addUserNickname: String!,
    $addUserEmail: String!,
    $addUserPassword: String!
  ) {
    addUser(
      nickname: $addUserNickname,
      email: $addUserEmail,
      password: $addUserPassword
    ) {
      success
      message
      user {
        _id
      }
    }
  }
`;


const ADD_EVENT = gql`
  mutation AddEvent(
    $addEventDescription: String!,
    $addEventDate: String!,
    $addEventTime: String!,
    $addEventLatitude: Float!,
    $addEventLongitude: Float!,
    $addEventSport: String!,
    $addEventFree: Boolean!,
    $addEventPrice: String,
    $addCreator_id: String!,

  ) {
    addEvent(
      description: $addEventDescription,
      date: $addEventDate,
      time: $addEventTime,
      latitude: $addEventLatitude,
      longitude: $addEventLongitude,
      sport: $addEventSport,
      free: $addEventFree,
      price: $addEventPrice,
      creator_id: $addCreator_id,
    ) {
      success
      message
      updatedList {
        _id
        description
        date
        time
        latitude
        sport
        longitude
        free
        creator_id
        price
      }
    }
  }
`;

// mutation Mutation($addEventDescription: String!, $addEventDate: String!, $addEventTime: String!, $addEventLatitude: Float!, $addEventLongitude: Float!, $addEventSport: String!, $addEventFree: Boolean!, $addEventCreatorId: String!, $addEventPrice: String) {
//   addEvent(description: $addEventDescription, date: $addEventDate, time: $addEventTime, latitude: $addEventLatitude, longitude: $addEventLongitude, sport: $addEventSport, free: $addEventFree, creator_id: $addEventCreatorId, price: $addEventPrice) {
//     success
//     message
//     event {
//       _id
//     }
//   }
// }

module.exports = {ADD_USER,  ADD_EVENT};
