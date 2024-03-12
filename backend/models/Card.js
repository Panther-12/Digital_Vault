const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ["Credit Card", "Debit Card", "Business Card", "Student Card", "Membership Card", "Prepaid Card", "Commercial Credit", "Forex Card"],
    required: true
  },
  name: {
    type: String,
    required: true
  },
  number: {
    type: String,
    required: true
  },
  expirationDate: {
    type: Date
  },
  pin: {
    type: Number,
    required: true
  },
  // Add more fields as needed
});

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;
