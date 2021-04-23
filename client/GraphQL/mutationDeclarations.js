import {gql} from '@apollo/client';

const ADD_USER = gql`
  mutation AddUser(
    $addUserNickname: String!
    $addUserEmail: String!
    $addUserPassword: String!
  ) {
    addUser(
      nickname: $addUserNickname
      email: $addUserEmail
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
    $addEventDescription: String!
    $addEventDate: String!
    $addEventTime: String
    $addEventLatitude: Float!
    $addEventLongitude: Float!
    $addEventSport: String!
    $addEventFree: Boolean!
    $addEventPrice: String
    $addCreator_id: String!
    $addCreator_username: String!
  ) {
    addEvent(
      description: $addEventDescription
      date: $addEventDate
      time: $addEventTime
      latitude: $addEventLatitude
      longitude: $addEventLongitude
      sport: $addEventSport
      free: $addEventFree
      price: $addEventPrice
      creator_id: $addCreator_id
      creator_username: $addCreator_username
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
        creator_username
        price
      }
    }
  }
`;

const UPDATE_HOSTING = gql`
  mutation UpdatedUserHosting(
    $updateUserHostingId: ID!
    $updateUserHostingEvent: ID!
  ) {
    updateUserHosting(
      _id: $updateUserHostingId
      event: $updateUserHostingEvent
    ) {
      success
      message
    }
  }
`;

module.exports = {ADD_USER, ADD_EVENT, UPDATE_HOSTING};
