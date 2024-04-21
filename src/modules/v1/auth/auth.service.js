const { models } = require("../../../models/index");

async function getUserInfo(userId) {
  const { Profile } = models;
  return Profile.findById(userId);
}

async function logIn(userId) {
  const { Profile } = models;
  return Profile.findById(userId);
}

async function signUp(userId) {
  const { Profile } = models;
  return Profile.findById(userId);
}


module.exports = {
  getUserInfo,
  logIn,
  signUp,
};