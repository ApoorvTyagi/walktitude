const mongoose = require('mongoose')

const schemaDefinition = {
  firstName: {
    type: String,
    trim: true,
    required: true,
    minLength: 1
  },
  lastName: {
    type: String,
    trim: true,
    required: true,
    minLength: 1
  },
  displayName: {
    type: String,
    trim: true,
    required: true,
    minLength: 1
  },
  emailId: {
    type: String,
    trim: true,
    required: false
  },
  location: {
    type: {
        type: String,
        required: false
    },
    coordinates: [ Number ],
  },
  image: {
    type: String,
    trim: true,
    required: false
  },
  googleId: {
    type: String,
    trim: true,
    required: true
  }
}

const schemaOptions = {
  timestamps: true,
  toJSON: {
    transform: function (_doc, ret) {
      delete ret._id
      delete ret.__v
      delete ret.createdAt
      delete ret.updatedAt
      delete ret.googleId
    }
  }
}

const profileSchema = mongoose.Schema(schemaDefinition, schemaOptions);

profileSchema.index({"location": "2dsphere"});

const Profile = mongoose.model('profile', profileSchema);

exports.Profile = Profile
