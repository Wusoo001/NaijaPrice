const mongoose = require('mongoose');

const priceSchema = new mongoose.Schema({
  state: { type: String, required: true },
  food: { type: String, required: true },
  currentPrice: { type: Number, required: true },
  history: { type: [Number], default: [] },
});

module.exports = mongoose.model('Price', priceSchema);
