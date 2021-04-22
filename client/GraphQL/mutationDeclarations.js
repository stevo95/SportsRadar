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
    $addEventDatetime: String!,
    $addEventLatitude: Float!,
    $addEventLongitude: Float!,
    $addEventSport: String!,
    $addEventFree: Boolean!,
    $addCreator_id: String!,
    $addEventPrice: String,

  ) {
    addEvent(
      description: $addEventDescription,
      datetime: $addEventDatetime,
      latitude: $addEventLatitude,
      longitude: $addEventLongitude,
      sport: $addEventSport,
      free: $addEventFree,
      price: $addEventPrice,
      creator_id: $addCreator_id,
    ) {
      success
      message
      event {
        _id
      }
    }
  }
`;

module.exports = {ADD_USER,  ADD_EVENT};
