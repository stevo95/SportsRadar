'use-strict'

const models = require('../database/database-models/models');
const {ApolloError}  = require('apollo-server-errors');
1
module.exports = {
  Query: {
    getUser: async(_, {_id}) => {
      console.log('in server');
      try {
        console.log('getting user');
        const user = await models.userModels.getUserById(_id);
        return user[0];
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    getAllEvents: async( _, __ ) => {
      console.log('getting all events');
      try {
        const eventsData = await models.eventModels.getAllEvents();
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
  },
  updateUserHosting: async (_, userData) => {
    try{
      const updatedUser = await models.userModels.updateUserHosting(userData);
      let responseMessage = {
        success: true,
        message: 'Successfully updated',
      }
      return responseMessage;
    } catch (error) {
      console.log(error);
      throw new ApolloError(error);
    }
  },
  userJoinedEvent: async (_, mutationData) => {
    console.log('in server');
    console.log(mutationData);
    try{
      await models.userModels.updateUserAttending(mutationData);
      await models.eventModels.updateEventAttendance(mutationData);
      let responseMessage = {
        success: true,
        message: 'Successfully updated',
      }
      return responseMessage;
    } catch (error) {
      console.log(error);
      throw new ApolloError(error);
    }
  }
  }
}