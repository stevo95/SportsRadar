'user-strict'

const db = require('../db');

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

async function updateUserHosting(userData) {
  try {
    const user = await db.users.findByPk(userData._id);
    const toLoad = [...user.events_hosting, userData.eventId];
    const updatedHosting = await db.users.update({events_hosting: toLoad}, {
      where: {
        _id: userData._id
      }
    });
    const updatedUser = await db.users.findByPk(userData._id);
    return updatedUser.events_hosting;
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function updateUserAttending(userData) {
  try {
    const user = await db.users.findByPk(userData._id);
    const toLoad = [...user.events_attending, userData.eventId];
    const updatedHosting = await db.users.update({events_hosting: toLoad}, {
      where: {
        _id: userData._id
      }
    });
    return;
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function updateUserRating(_, {id}, {newRating}) {
  try {
    const userRating = await db.user.update({rating: newRating}, {
      where: {
        _id: id
      }
    });
    return userRating;
  } catch (error) {
    return error;
  }
}

async function updateUserFriends(_, {id}, {newFriends}) {
  try {
    const userFriends = await db.user.update({friends: newFriends}, {
      where: {
        _id: id
      }
    });
    return userFriends;
  } catch (error) {
    return error;
  }
}

module.exports = {getUserById, addUser, updateUserRating, updateUserFriends, updateUserHosting, updateUserAttending};
