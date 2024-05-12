const _ = require("lodash");
const boom = require('@hapi/boom');
const mongoose = require('mongoose');
const { models } = require("../../../models/index");
const { pushNotification } = require('../../../util/notification/index');

async function swipeRight(userId, inviteeId) {
  const { Invite, Profile } = models;
  const [user, invitee, result] = await Promise.all([
    Profile.findById(userId),
    Profile.findById(inviteeId),
    Invite.findOneAndUpdate(
      { userId },
      { $addToSet: { invitees: mongoose.Types.ObjectId(inviteeId) } },
      { new: true, upsert: true }
    )
  ])
  const notification = {
    message: {
      notification: {
        title: "Let's Take a Stroll Together 🧑‍🤝‍🧑",
        body: `Hey ${invitee.firstName}, fancy a walk together with ${user.firstName} to catch up and enjoy the outdoors?`,
        image: "",
      },
      webpush: {
        fcm_options: {
          link: `https://walktitude.web.app/invite?partner_id=${user._id}`,
        },
      },
      token: `${invitee.web_device_token}`,
    },
  }
  pushNotification(user, invitee, notification);
  return result;
}

async function acceptRequest(userId, invitedBy) {
  const { Profile, Invite, History } = models;
  const profile = await Profile.findById(invitedBy).lean();
  if (profile.walk?.is_active) {
    throw boom.conflict(`${profile.firstName}'s boat has sailed. Try with someone else`);
  }
  const [invitee, invitor] = await Promise.all([
    // ADD WALK TO PROFILE
    Profile.findOneAndUpdate(
      { _id: userId },
      {
        $set: { "walk.is_active": true },
        $addToSet: {
          "walk.active_with_users": mongoose.Types.ObjectId(invitedBy),
        },
      }
    ),
    Profile.findOneAndUpdate(
      { _id: invitedBy },
      {
        $set: { "walk.is_active": true },
        $addToSet: {
          "walk.active_with_users": mongoose.Types.ObjectId(userId),
        },
      }
    ),

    // DELETE REMAINING INVITES OF WALKERS
    Invite.findOneAndDelete({ userId }),
    Invite.findOneAndDelete({ userId: invitedBy }),

    // ADD TO WALKERS HISTORY
    History.findOneAndUpdate(
      { userId },
      { $addToSet: { pastWalkers: { walkerId: invitedBy } } }, // TODO: Fix unique
      { upsert: true }
    ),
    History.findOneAndUpdate(
      { userId: invitedBy },
      { $addToSet: { pastWalkers: { walkerId: userId } } }, // TODO: Fix unique
      { upsert: true }
    ),
  ]);

  const notification = {
    message: {
      notification: {
        title: "Walk Confirmed! 🌟",
        body: `Great news, ${invitor.firstName}! ${invitee.firstName} is looking forward to walking together. Make it a memorable one!`,
        image: "",
      },
      webpush: {
        fcm_options: {
          link: `https://walktitude.web.app/dashboard`,
        },
      },
      token: `${invitor.web_device_token}`,
    },
  };
  pushNotification(invitor, invitee, notification);

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
