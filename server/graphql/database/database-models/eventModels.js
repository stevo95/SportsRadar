'user-strict'

const db = require('../db');

async function addEvent (eventData) {
  try {
    console.log('adding event');
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
      attendance: [eventData.creator_id]
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

async function updateEventAttendance(mutationData) {
  try {
    const event = await db.events.findByPk(mutationData.eventId);
    if (!event.attendance.includes(mutationData._id)) {
      const toLoad = [...event.attendance, mutationData._id];
      const attendance = await db.events.update({attendance: toLoad}, {
        where: {
          _id: mutationData.eventId
        }
      });
    }
    return;
  } catch (error) {
    console.log(error);
    return error;
  }
};

async function userLeftEvent (mutationData) {
  try {
    const event = await db.events.findByPk(mutationData.eventId);
    let attending = [...event.attendance];
    const idx = attending.indexOf(mutationData._id);
    if (idx !== -1) {
      attending.splice(idx, 1);
      const updatedHosting = await db.events.update({attendance: attending}, {
        where: {
          _id: mutationData.eventId
        }
      });
    }
    return;
  } catch (error) {
    console.log(error);
    return error;
  }
}; 

async function deleteEvent(mutationData) {
  try{
    const event = await db.events.findByPk(mutationData.eventId);
    await event.destroy();
  } catch(error) {
    console.log(error);
    return error;
  }
}

module.exports = {addEvent, getAllEvents, updateEventAttendance, userLeftEvent, deleteEvent}