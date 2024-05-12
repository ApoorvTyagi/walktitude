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

async function endWalk(userId) {
  const { Profile } = models;
  const empty_walk_object = {
    is_active: false,
    active_with_users: [],
  };

  const profile = await Profile.findByIdAndUpdate(userId, { $set: { walk: empty_walk_object } }).lean();
  const promiseArray = profile.walk.active_with_users.map((walker) => {
    Profile.findByIdAndUpdate(walker, { $set: { walk: empty_walk_object } });
  });

  await Promise.all(promiseArray);
  return { is_success: true };
}

module.exports = {
  fetchNearestWalker,
  updateLocation,
  patchUser,
  getUser,
  endWalk,
};
