const mongoose = require('mongoose'); 

const hallOfFameSchema = new mongoose.Schema(
  {
    userId: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
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
    time: {
      type: Number,
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
    moving_time: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const HallOfFame = mongoose.model('HallOfFame', hallOfFameSchema);

module.exports = HallOfFame;
