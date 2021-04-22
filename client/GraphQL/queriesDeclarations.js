import {gql} from '@apollo/client';

const GET_ALL_EVENTS = gql`
  query GetAllEvents {
    getAllEvents {
      _id
      description
      datetime
      latitude
      longitude
      sport
      free
      creator_id
      price
    }
  }
`;

module.exports = {GET_ALL_EVENTS};
