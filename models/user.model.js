const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: false,
      default: '',
    },
    state: {
      type: String,
      required: false,
      default: '',
    },
    country: {
      type: String,
      required: false,
      default: '',
    },
    weight: {
      type: Number,
      required: false,
      default: null,
    },
    profile: {
      type: String,
      required: true,
    },
    stravaAccessToken: {
      type: String,
      required: true,
    },
    stravaRefreshToken: {
      type: String,
      required: true,
    },
    tokenExpiration: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);

module.exports = User; 
