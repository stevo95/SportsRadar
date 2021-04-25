'use-strict'

const models = require('../database/database-models/models');
const {ApolloError}  = require('apollo-server-errors');

module.exports = {
  Query: {
    getUser: async(_, {_id}) => {
      try {
        const user = await models.userModels.getUserById(_id);
        return user[0];
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    getAllEvents: async( _, __ ) => {
      try {
        const eventsData = await models.eventModels.getAllEvents();
        return eventsData;
      } catch (error) {
        console.log(error);
        throw new ApolloError(error);
      }
    },
  },
  Mutation: {
    addUser: async (_,  userData ) => {
      try {
        const user = await models.userModels.addUser(userData);
        return user;
      } catch (error) {
        console.log('error');
        throw new ApolloError(error);
      }
    },
    addEvent: async (_, eventData ) => {
      try {
      const event = await models.eventModels.addEvent(eventData);
      let responseMessage = {
        success: true,
        message: 'Event added to database',
        event: event.dataValues,
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
    try{
      await models.userModels.updateUserAttending(mutationData);
      await models.eventModels.updateEventAttendance(mutationData);
      const events = await models.eventModels.getAllEvents();
      let responseMessage = {
        success: true,
        message: 'Successfully updated',
        updatedList: events,
      }
      return responseMessage;
    } catch (error) {
      console.log(error);
      throw new ApolloError(error);
    }
  },
  userLeftEvent: async (_, mutationData) => {
    try{
      await models.userModels.userLeftEvent(mutationData);
      await models.eventModels.userLeftEvent(mutationData);
      const events = await models.eventModels.getAllEvents();
      let responseMessage = {
        success: true,
        message: 'Successfully updated',
        updatedList: events,
      }
      return responseMessage;
    } catch (error) {
      console.log(error);
      throw new ApolloError(error);
    }
  },
  deleteEvent: async (_, mutationData) => {
    try{
      await models.eventModels.deleteEvent(mutationData);
      await models.userModels.eventWasDeleted(mutationData);
      const events = await models.eventModels.getAllEvents();
      let responseMessage = {
        success: true,
        message: 'Successfully updated',
        updatedList: events,
      }
      console.log('finished');
      return responseMessage;
    } catch (error) {
      console.log(error);
      throw new ApolloError(error);
    }
  },

  },
}