const mongoose = require("mongoose");
const InviteSchema = require("./Invite");
const ProfileSchema = require("./Profile");
const HistorySchema = require("./History")

const models = {};

const setupModels = () => {
  models.Profile = mongoose.model("Profile", ProfileSchema);
  models.Invite = mongoose.model("Invite", InviteSchema);
  models.History = mongoose.model("History", HistorySchema);
};

module.exports = {
  setupModels,
  models,
};
