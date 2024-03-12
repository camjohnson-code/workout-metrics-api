const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    quote: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: false,
      default: 'fitness',
    },
  },
  {
    timestamps: true,
  }
);

const Quote = mongoose.model('Quote', quoteSchema);

module.exports = Quote;
