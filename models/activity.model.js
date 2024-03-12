const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema(
  {
    userId: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: false,
      default: '',
    },
    distance: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    start_date: {
      type: String,
      required: true,
    },
    start_latlng: {
      type: [Number],
      validate: {
        validator: function (array) {
          return array.length === 2;
        },
        message: 'start_latlng should be an array of exactly two numbers',
      },
      required: false,
      default: [],
    },
    time: {
      type: Number,
      required: true,
    },
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    moving_time: {
      type: Number,
      required: true,
    },
    achievement_count: {
      type: Number,
      required: false,
      default: 0,
    },
    kudos_count: {
      type: Number,
      required: false,
      default: 0,
    },
    map: {
      type: {
        id: {
          type: String,
          required: true,
        },
        summary_polyline: {
          type: String,
          required: true,
        },
      },
      required: false,
      default: {},
    },
    maxSpeed: {
      type: Number,
      required: false,
      default: 0,
    },
    kilojoules: {
      type: Number,
      required: false,
    },
    total_elevation_gain: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;
