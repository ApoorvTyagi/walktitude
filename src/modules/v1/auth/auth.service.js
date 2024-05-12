const { models } = require("../../../models/index");
const { mintToken } = require("../../../util/authentication/index");

async function getUserInfo(userId) {
  const { Profile } = models;
  return await Profile.findById(userId)
    .populate("walk.active_with_users").lean();
}

async function logIn({ displayName, email, photoURL }) {
  const { Profile } = models;

  let result = await Profile.findOne({ emailId: email });
  if (!result) {
    const firstName = displayName.split(" ")[0];
    const lastName = displayName.split(" ")[1] ?? firstName;
    result = await Profile({
      firstName,
      lastName,
      emailId: email,
      image: photoURL,
    }).save();
  }

  const token = mintToken({
    userId: result._id,
  });

  return {
    token,
    ...result._doc,
  };
}

module.exports = {
  getUserInfo,
  logIn,
};
