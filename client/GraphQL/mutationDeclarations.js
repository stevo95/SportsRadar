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

const USER_JOINED_EVENT = gql`
  mutation UserJoinedEvent($userId: String!, $eventId: String!) {
    userJoinedEvent(_id: $userId, eventId: $eventId) {
      success
      message
    }
  }
`;
const USER_LEFT_EVENT = gql`
  mutation UserLeftEvent($userId: String!, $eventId: String!) {
    userLeftEvent(_id: $userId, eventId: $eventId) {
      success
      message
    }
  }
`;
const DELETE_EVENT = gql`
  mutation DeleteEvent($userId: String!, $eventId: String!) {
    deleteEvent(_id: $userId, eventId: $eventId) {
      success
      message
    }
  }
`;

module.exports = {
  ADD_USER,
  ADD_EVENT,
  UPDATE_HOSTING,
  USER_JOINED_EVENT,
  USER_LEFT_EVENT,
};
