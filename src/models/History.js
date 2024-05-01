const mongoose = require("mongoose");

const pastWalkerSchema = {
  _id: false,
  walkerId: {
    type: mongoose.Schema.Types.ObjectId,
    index: true,
    unique: true,
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
};
const schemaDefinition = {
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    index: true,
    unique: true,
    required: true,
  },
  pastWalkers: [pastWalkerSchema],
};

const schemaOptions = {
  timestamps: true,
  toJSON: {
    transform: function (_doc, ret) {
      delete ret.__v;
      delete ret.createdAt;
      delete ret.updatedAt;
    },
  },
};

const historySchema = mongoose.Schema(schemaDefinition, schemaOptions);

module.exports = historySchema;
