/* eslint-disable prettier/prettier */
// require('dotenv').config();

import React from 'react';
import { Root } from 'native-base';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { onError } from 'apollo-link-error';

import {NavigationContainer} from '@react-navigation/native';
import RootStackScreen from './Navigators/RootStack.Navigator';

const client = new ApolloClient({
  // 192.168.1.178
  // const baseURL = 'http://192.168.1.178:3002';
  uri: 'http://192.168.1.179:4000',
  cache: new InMemoryCache({}),
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
