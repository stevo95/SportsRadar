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

async function updateUserEvents(_, {id}, {newEvents}) {
  try {
    const userEvents = await db.user.update({events: newEvents}, {
      where: {
        _id: id
      }
    });
    return userEvents;
  } catch (error) {
    return error;
  }
}

async function deleteUser(_, {_id}) {
  console.log(_);
  console.log(_id);
  console.log('here');
  try {
    console.log('works');
    const deleted = await db.user.destroy({
      where: {
        _id: _id
      }
    });
    // return deleted;
  } catch (error) {
    // return error;
  }
}

module.exports = {getUserById, addUser, updateUserRating, updateUserFriends, updateUserEvents, deleteUser};
