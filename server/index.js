'use-strict'

require('dotenv').config()

const { ApolloServer } = require('apollo-server');

// const typeDefs = require('./graphql/schemas');
const typeDefs = require('./graphql/schemas/typeDefs');
// const resolvers = require('./graphql/resolvers');
const resolvers = require('./graphql/resolvers/resolvers_');
const dbModels = require('./graphql/database/database-models/models');


const server = new ApolloServer({
  cors: {
    origin: '*',
		credentials: true
  },
  typeDefs, 
  resolvers,
});

server
  .listen()
  .then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`)
  });