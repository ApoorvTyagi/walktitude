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
    "walk.is_active": false,
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

async function patchUser(userId, updatedPayload) {
  updatedPayload = _.omitBy(updatedPayload, _.isNil);
  await validateGhostMode(userId, updatedPayload.is_ghost_mode);
  const { Profile } = models;
  return Profile.findByIdAndUpdate(userId, { $set: { ...updatedPayload } }, { new: true });
}

async function getUser(userId) {
  const { Profile } = models;
  const profile = await Profile.findById(userId);
  return _.pick(profile, ['firstName', 'lastName', 'image']);
}

module.exports = {
  fetchNearestWalker,
  updateLocation,
  postNewUser,
  patchUser,
  getUser,
};
