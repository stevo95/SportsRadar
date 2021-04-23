'user-strict'

const db = require('../db');

async function addEvent (eventData) {
  try {
    await db.events.sync();
    const newEvent = await db.events.create({
      description: eventData.description,
      date: eventData.date,
      time: eventData.time,
      latitude: eventData.latitude,
      longitude: eventData.longitude,
      sport: eventData.sport,
      free: eventData.free,
      creator_id: eventData.creator_id,
      creator_username: eventData.creator_username,
      price: eventData.price,
    });
    const updatedList = await getAllEvents();
    return updatedList;
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