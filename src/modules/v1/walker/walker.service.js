const _ = require('lodash');
const { models } = require("../../../models/index");
const boom = require('@hapi/boom');

async function fetchNearestWalker(userId, coordinates, maxDistance) {
  const { Profile } = models;
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
      console.log(error);
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
      console.log(error);
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

async function validateGhostMode(userId, is_ghost_mode) {
  if (!_.isNil(is_ghost_mode) && is_ghost_mode) {
    const { Profile } = models;
    const user = await Profile.findById(userId);
    console.log(user)
    if (!user?.is_premium_user) {
      throw boom.forbidden("Only premium users are allowed to use ghost mode");
    }
  }
}

module.exports = {
  fetchNearestWalker,
  updateLocation,
  postNewUser,
  patchUser,
};
