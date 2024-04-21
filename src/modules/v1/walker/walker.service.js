const _ = require('lodash');
const { models } = require("../../../models/index");

async function fetchNearestWalker(coordinates, maxDistance) {
  const { Profile } = models;
  return Profile.find({
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

module.exports = {
  fetchNearestWalker,
  updateLocation,
  postNewUser,
};
