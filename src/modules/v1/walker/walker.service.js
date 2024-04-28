const _ = require('lodash');
const { models } = require("../../../models/index");
const { validateGhostMode, updateLastActivityTime } = require('./walker.util');
const logger = require('../../../util/logger/index')

async function fetchNearestWalker(userId, coordinates, maxDistance) {
  const { Profile } = models;
  updateLastActivityTime(userId);
  return Profile.find({
    _id: { $ne: userId },
    is_ghost_mode: false,
    location: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: coordinates,
        },
        $maxDistance: maxDistance,
      },
    },
  })
    .exec()
    .catch((error) => {
      logger.error(`Error in fetchNearestWalker: ${error}`);
    });
}

async function updateLocation(longitude, latitude, userId) {
  const { Profile } = models;
  return Profile.findByIdAndUpdate(userId, {
      $set: {
        location: {
          type: "Point",
          coordinates: [parseFloat(longitude), parseFloat(latitude)],
        },
      }
    },
    { new: true }
  )
    .exec()
    .catch((error) => {
      logger.error(`Error in updateLocation: ${error}`);
    });
}

async function postNewUser({
  firstName,
  lastName,
  emailId,
  latitude,
  longitude,
  image,
  googleId,
}) {
  const { Profile } = models;
  let location = {}
  if (latitude && longitude) {
    location = {
        type: "Point",
        coordinates: [parseFloat(longitude), parseFloat(latitude)]
    }
  }
  const payload = _.omitBy(
    { firstName, lastName, emailId, location, image, googleId },
    _.isNil
  );
  return new Profile(payload).save();
}

async function patchUser(userId, updatedPayload) {
  updatedPayload = _.omitBy(updatedPayload, _.isNil);
  await validateGhostMode(userId, updatedPayload.is_ghost_mode);
  const { Profile } = models;
  return Profile.findByIdAndUpdate(userId, { $set: { ...updatedPayload } }, { new: true });
}

module.exports = {
  fetchNearestWalker,
  updateLocation,
  postNewUser,
  patchUser,
};
