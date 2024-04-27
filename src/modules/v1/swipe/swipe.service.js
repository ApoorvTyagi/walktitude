const _ = require("lodash");
const { models } = require("../../../models/index");

async function swipeRight(userId, inviteeId) {
  const { Invite } = models;
  return await Invite.findOneAndUpdate(
    { userId },
    { $push: { invitees: { inviteeId } } }, 
    { new: true, upsert: true}
  );
}

module.exports = {
  swipeRight,
};
