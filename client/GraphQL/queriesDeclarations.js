import {gql} from '@apollo/client';

const GET_ALL_EVENTS = gql`
  query GetAllEvents {
    getAllEvents {
      _id
      description
      date
      time
      latitude
      longitude
      sport
      free
      creator_id
      creator_username
      attendance
      price
    }
  }
`;
const GET_USER = gql`
  query GetUser($getUserId: ID!) {
    getUser(_id: $getUserId) {
      _id
      nickname
      email
      password
      img_url
      rating
      bio
    }
  }
`;

module.exports = {GET_ALL_EVENTS, GET_USER};
