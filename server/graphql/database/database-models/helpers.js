'use strict'

const db = require('../db');
const { Op } = require('sequelize');

async function updateSingleHosting(userId, eventId, action) {
  try{
    if (action === 'delete') {
      const creatorUser = await db.users.findByPk(userId);
      const hostingArray = [...creatorUser.events_hosting];
      const idx = hostingArray.indexOf(eventId);
      if (idx !== -1) {
        hostingArray.splice(idx, 1);
        console.log(hostingArray);
        await db.users.update({events_hosting: hostingArray}, {
          where: {
            _id: userId
          }
        });
      }
    } else if (action === 'add') {
      const user = await db.users.findByPk(userId);
      const toLoad = [...user.events_hosting, eventId];
      const updatedHosting = await db.users.update({events_hosting: toLoad}, {
        where: {
          _id: userId
        }
      });
      const updatedUser = await db.users.findByPk(userId);
      return updatedUser;
    } else {
      throw new Error('Selected database action is undefined. Check database models');
    }
  } catch (error) {
    return error;
  }
};

async function updateSingleAttending(userId, eventId, action) {
  try{
    if (action === 'join') {
      const user = await db.users.findByPk(userId);
      if (!user.events_attending.includes(eventId)) {
        const toLoad = [...user.events_attending, eventId];
        const updatedAttending = await db.users.update({events_attending: toLoad}, {
          where: {
            _id: userId
          }
        });
      }
      return;
    } else if (action === 'leave') {
      const user = await db.users.findByPk(userId);
      let attending = [...user.events_attending];
      const idx = attending.indexOf(eventId);
      if (idx !== -1) {
        attending.splice(idx, 1);
        const updatedHosting = await db.users.update({events_attending: attending}, {
          where: {
            _id: userId
          }
        });
      }
      return;
    } else {
      throw new Error('Selected database action is undefined. Check database models');
    }
  } catch (error) {
    return error;
  }
}

module.exports = { updateSingleHosting, updateSingleAttending};
