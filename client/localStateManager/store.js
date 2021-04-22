import {gql, useQuery} from '@apollo/client';

const QUERY_ALL_EVENTS = gql`
  query {
    events @client {
      allEvents {
        _id
        description
        latitude
        longitude
        sport
        free
        price
      }
    }
  }
`;

module.exports = {QUERY_ALL_EVENTS};

// const { data } = useQuery(QUERY_ALL_EVENTS);
