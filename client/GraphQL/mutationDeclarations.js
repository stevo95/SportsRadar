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
    $addEventDescription: String
    $addEventDate: String
    $addEventTime: String
    $addEventLatitude: Float
    $addEventLongitude: Float
    $addEventSport: String
    $addEventFree: Boolean
    $addEventCreatorId: String
    $addEventCreatorUsername: String
    $addEventPrice: String
  ) {
    addEvent(
      description: $addEventDescription
      date: $addEventDate
      time: $addEventTime
      latitude: $addEventLatitude
      longitude: $addEventLongitude
      sport: $addEventSport
      free: $addEventFree
      creator_id: $addEventCreatorId
      creator_username: $addEventCreatorUsername
      price: $addEventPrice
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
    $updateUserHostingId: String!
    $updateUserHostingEventId: String!
  ) {
    updateUserHosting(
      _id: $updateUserHostingId
      eventId: $updateUserHostingEventId
    ) {
      success
      message
    }
  }
`;

module.exports = {ADD_USER, ADD_EVENT, UPDATE_HOSTING};
