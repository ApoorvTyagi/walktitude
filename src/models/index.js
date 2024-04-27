const mongoose = require("mongoose");
const InviteSchema = require("./Invite");
const ProfileSchema = require("./Profile");

const models = {};

const setupModels = () => {
  models.Profile = mongoose.model("Profile", ProfileSchema);
  models.Invite = mongoose.model("Invite", InviteSchema);
};

module.exports = {
  setupModels,
  models,
};
