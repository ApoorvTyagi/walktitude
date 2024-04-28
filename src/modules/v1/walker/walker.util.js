const _ = require("lodash");
const { models } = require("../../../models/index");
const boom = require("@hapi/boom");

async function validateGhostMode(userId, is_ghost_mode) {
  if (!_.isNil(is_ghost_mode) && is_ghost_mode) {
    const { Profile } = models;
    const user = await Profile.findById(userId).lean();
    if (!user?.is_premium_user) {
      throw boom.forbidden("Only premium users are allowed to use ghost mode");
    }
  }
}

async function updateLastActivityTime(userId) { 
  const { Profile } = models;
  await Profile.findOneAndUpdate({ _id: userId }, { $set: { last_activity: new Date() } })
}

module.exports = {
  validateGhostMode,
  updateLastActivityTime,
};
