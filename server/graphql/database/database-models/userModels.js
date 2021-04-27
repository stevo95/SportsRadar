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
    return error;
  }
}

async function getUserList(idsArray) {
  try{
    const result = [];
    for (id of idsArray) {
      const user = await db.users.findByPk(id);
      if (user) result.push(user);
    }
    return result;
  } catch (error) {
    return error;
  }
}

async function addUser(userData) {
  try {
    await db.users.sync();
    const checkEmail = await db.users.findOne({ where: { email: userData.email } });
    if (checkEmail === null) {
      const checkUsername = await db.users.findOne({ where: { nickname: userData.nickname } });
      if (checkUsername !== null) {
        return {
          success: false,
          message: 'Username is already taken.'
        }
      }
    } else {
      return {
        success: false,
        message: 'Email already exists!'
      }
    }
    const newUser = await db.users.create({
      nickname: userData.nickname,
      email: userData.email,
      password: userData.password,
      bio: 'GO HARD !!!',
      friends: [],
      events_attending: [],
      events_hosting: [],
      posts: [],
      rating: 1,
      num_of_ratings: 0,
      img_url: 'http://assets.stickpng.com/thumbs/58909b545236a4e0f6e2f975.png',
    });
    return {
      success: true,
      message: 'User created',
      user: newUser
    };
  } catch (error) {
    return error;
  }
}

async function logIn(userData) {
  try {
    const user = await db.users.findOne({ where: { email: userData.email } });
    if (user === null) {
      return {
        success: false,
        message: 'Email does not exist',
      }
    }
    if (userData.password !== user.password) return {
      success: false,
      message: 'Wrong password!'
    }
    return {
      success: true,
      message: 'Log in approved',
      user: user,
    }
  } catch (error) {
    return error;
  }
}

async function updateUserHosting(mutationData) {
  try {
    const updatedUser = await helpers.updateSingleHosting(mutationData._id, mutationData.eventId,'add');
    return updatedUser.events_hosting;
  } catch (error) {
    return error;
  }
}

async function updateUserAttending(userData) {
  try {
    helpers.updateSingleAttending(userData._id, userData.eventId, 'join');
    return;
  } catch (error) {
    return error;
  }
};

async function userLeftEvent(userData) {
  try {
    helpers.updateSingleAttending(userData._id, userData.eventId, 'leave');
  } catch (error) {
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
    return error;
  }
};

async function addPost(mutationData) {
  try {
    await db.users.sync({ alter: true });
    const user = await db.users.findByPk(mutationData._id);
    const newPosts = [...user.posts, mutationData.post];
    await db.users.update({posts: newPosts}, {
      where: {
        _id: mutationData._id
      }
    });
    return newPosts;
  } catch (error) {
    return error;
  }
}

async function changeBio(mutationData) {
  try {
    const user = await db.users.findByPk(mutationData._id);
    const newBio = mutationData.bio;
    await db.users.update({bio: mutationData.bio}, {
      where: {
        _id: mutationData._id
      }
    });
    return newPosts;
  } catch (error) {
    return error;
  }
}

module.exports = {
  getUserById, 
  addUser, 
  updateUserRating, 
  updateUserFriends, 
  updateUserHosting, 
  updateUserAttending, 
  userLeftEvent, 
  eventWasDeleted, 
  logIn, 
  addPost, 
  changeBio,
  getUserList
};
