const mongoose = require("mongoose");

const schemaDefinition = {
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    index: true,
    unique: true,
    required: true,
  },
  invitees: {
    type: Array,
  },
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

const inviteSchema = mongoose.Schema(schemaDefinition, schemaOptions);

module.exports = inviteSchema;
