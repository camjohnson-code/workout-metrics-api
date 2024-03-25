const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema(
  {
    date: {
      type: String,
      default: null,
    },
    quote: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    hasBeenUsed: {
      type: Boolean,
      default: false,
    }, 
  },
  {
    timestamps: true, 
  }
);

const Quote = mongoose.model('Quote', quoteSchema);

module.exports = Quote;
