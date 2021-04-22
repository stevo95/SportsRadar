'user-strict'

const db = require('../db');

async function addEvent (eventData) {
  try {
    await db.events.sync();
    const newEvent = await db.events.create({
      description: eventData.description,
      datetime: eventData.datetime,
      latitude: eventData.latitude,
      longitude: eventData.longitude,
      sport: eventData.sport,
      free: eventData.free,
      creator_id: eventData.creator_id,
      price: eventData.price,
    });
    return newEvent;
  } catch(error) {
    return error;
  }
}

async function getAllEvents() {
  try {
    const events = await db.events.findAll();
    return events;
  } catch (error) {
    console.log(error);
    return error;
  }
}

module.exports = {addEvent, getAllEvents}