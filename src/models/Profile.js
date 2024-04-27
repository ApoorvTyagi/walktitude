const mongoose = require('mongoose')

const schemaDefinition = {
  firstName: {
    type: String,
    trim: true,
    required: true,
    minLength: 1,
  },
  lastName: {
    type: String,
    trim: true,
    required: true,
    minLength: 1,
  },
  emailId: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  location: {
    type: {
      type: String,
      required: false,
    },
    coordinates: [Number],
  },
  image: {
    type: String,
    trim: true,
    required: false,
  },
  is_premium_user: {
    type: Boolean,
    index: true,
    default: false,
  },
  is_ghost_mode: {
    type: Boolean,
    default: false,
  }
};

const schemaOptions = {
  timestamps: true,
  toJSON: {
    transform: function (_doc, ret) {
      delete ret.__v
      delete ret.createdAt
      delete ret.updatedAt
    }
  }
}

const profileSchema = mongoose.Schema(schemaDefinition, schemaOptions);

profileSchema.index({"location": "2dsphere"});

module.exports = profileSchema;
