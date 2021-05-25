/* eslint-disable prettier/prettier */
// require('dotenv').config();

import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import { Root } from 'native-base';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import {NavigationContainer} from '@react-navigation/native';
import RootStackScreen from './Navigators/RootStack.Navigator';

const client = new ApolloClient({
  uri: 'http://192.168.1.181:4000',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          getAllEvents: {
            merge(existing, incoming) {
              return incoming;
            },
          },
        },
      },
    },
  }),
});

function App() {
  return (
      <ApolloProvider client={client}>
        <Root>
          <NavigationContainer>
            <RootStackScreen/>
          </NavigationContainer>
        </Root>
      </ApolloProvider>
    );
}

export default App;
