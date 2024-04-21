const mongoose = require("mongoose");
const ProfileSchema = require("./Profile");

const models = {};

const setupModels = () => {
  models.Profile = mongoose.model("Profile", ProfileSchema);
};

module.exports = {
  setupModels,
  models,
};
