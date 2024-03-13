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
          required: false,
        },
        summary_polyline: {
          type: String,
          required: false,
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
