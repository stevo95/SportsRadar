'use-strict'

const db = require('../database/db');


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

module.exports = {updateUserRating, updateUserFriends, updateUserFriends, deleteUser};