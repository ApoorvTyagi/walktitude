const _ = require("lodash");
const boom = require('@hapi/boom');
const mongoose = require('mongoose');
const { models } = require("../../../models/index");

async function swipeRight(userId, inviteeId) {
  const { Invite } = models;
  return await Invite.findOneAndUpdate(
    { userId },
    { $addToSet: { invitees: mongoose.Types.ObjectId(inviteeId) } },
    { new: true, upsert: true }
  );
}

async function acceptRequest(userId, invitedBy) {
  const { Profile, Invite, History } = models;
  const profile = await Profile.findById(invitedBy).lean();
  if (profile.walk?.is_active) {
    throw boom.conflict(`${profile.firstName}'s boat has sailed. Try with someone else`);
  }
  await Promise.all([
    // ADD WALK TO PROFILE
    Profile.findOneAndUpdate(
      { _id: userId },
      {
        walk: {
          is_active: true,
          $addToSet: { active_with_users: mongoose.Types.ObjectId(invitedBy) },
        },
      }
    ),
    Profile.findOneAndUpdate(
      { _id: invitedBy },
      {
        walk: {
          is_active: true,
          $addToSet: { active_with_users: mongoose.Types.ObjectId(userId) },
        },
      }
    ),

    // DELETE REMAINING INVITES OF WALKERS
    Invite.findOneAndDelete({ userId }),
    Invite.findOneAndDelete({ userId: invitedBy }),

    // ADD TO WALKERS HISTORY
    History.findOneAndUpdate(
      { userId },
      { $addToSet: { pastWalkers: { walkerId: invitedBy } } },
      { upsert: true }
    ),
    History.findOneAndUpdate(
      { userId: invitedBy },
      { $addToSet: { pastWalkers: { walkerId: userId } } },
      { upsert: true }
    ),
  ]);

  return { message: `You are now ready to walk with ${profile.firstName}`, is_success:true };
}

async function denyRequest(userId, invitedBy) {
  const { Invite } = models;
  return Invite.findOneAndUpdate(
    { userId: invitedBy },
    { $pull: { invitees: mongoose.Types.ObjectId(userId)  } }
  );
}

module.exports = {
  swipeRight,
  acceptRequest,
  denyRequest
};
