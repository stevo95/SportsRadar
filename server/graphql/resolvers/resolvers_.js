'use-strict'

const models = require('../database/database-models/models');
const {ApolloError}  = require('apollo-server-errors');

module.exports = {
  Query: {
    // users: async (_, __) => 
    //   await models.userModels.test(),
    user: async(_, {id}) => {
      // id is undefined, not getting passed in from the mutation query
      // look for solution
      try {
        console.log(id);
        await models.userModels.getUserById(id);
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    getAllEvents: async( _, __ ) => {
      try {
        const eventsData = await models.eventModels.getAllEvents();
        console.log(eventsData);
        return eventsData;
      } catch (error) {
        console.log(error);
        throw new ApolloError(error);
      }
    }
  },
  Mutation: {
    addUser: async (_,  userData ) => {
      try {
        const events = await models.userModels.addUser(userData);
        return events;
      } catch (error) {
        console.log('error');
        throw new ApolloError(error);
      }
    },
    addEvent: async (_, eventData ) => {
      try {
      const events = await models.eventModels.addEvent(eventData);
      let responseMessage = {
        success: true,
        message: 'Event added to database',
        updatedList: events,
      }
      return responseMessage;
    } catch (error) {
      console.log(error);
      throw new ApolloError(error);
    }
  }
  }
}