'user-strict'

const db = require('../db');
const { Op } = require('sequelize');
const helpers = require('./helpers');

async function getUserById(id) {
  try{
    const user = await db.users.findAll({
      where: {
        _id: id
      }
    });
    return user;
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function addUser(userData) {
  try {
    await db.users.sync();
    const newUser = await db.users.create({
      nickname: userData.nickname,
      email: userData.email,
      password: userData.password,
      bio: '',
      friends: [],
      events_attending: [],
      events_hosting: [],
      posts: []
    });
    return newUser;
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function updateUserHosting(mutationData) {
  try {
    const updatedUser = await helpers.updateSingleHosting(mutationData._id, mutationData.eventId,'add');
    return updatedUser.events_hosting;
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function updateUserAttending(userData) {
  try {
    helpers.updateSingleAttending(userData._id, userData.eventId, 'join');
    return;
  } catch (error) {
    console.log(error);
    return error;
  }
};

async function userLeftEvent(userData) {
  try {
    helpers.updateSingleAttending(userData._id, userData.eventId, 'leave');
  } catch (error) {
    console.log(error);
    return error;
  }
};

async function updateUserRating({id}, {newRating}) {
  try {
    const userRating = await db.users.update({rating: newRating}, {
      where: {
        _id: id
      }
    });
    return userRating;
  } catch (error) {
    return error;
  }
};

async function updateUserFriends({id}, {newFriends}) {
  try {
    const userFriends = await db.users.update({friends: newFriends}, {
      where: {
        _id: id
      }
    });
    return userFriends;
  } catch (error) {
    return error;
  }
};

async function eventWasDeleted(mutationData) {
  try{
    const updateHosting = await helpers.updateSingleHosting(mutationData._id, mutationData.eventId, 'delete');
    const users = await db.users.findAll({where: {
      events_attending: {
        [Op.contains]: [mutationData.eventId]
      }
    }}
    );
    for (const user of users) {
      const toLoad = [...user.events_attending];
      const idx = toLoad.indexOf(mutationData.eventId);
      toLoad.splice(idx, 1);
      await db.users.update({events_attending: toLoad}, {
        where: {
          _id: user._id
        }
      });
    }
    return;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// {where: {
//   events_attending: {
//     [Op.contains]: [mutationData.eventId]
//   }
// }}

module.exports = {getUserById, addUser, updateUserRating, updateUserFriends, updateUserHosting, updateUserAttending, userLeftEvent, eventWasDeleted};
