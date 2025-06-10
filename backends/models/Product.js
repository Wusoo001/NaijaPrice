const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  food: { type: String, required: true },
  state: { type: String, required: true },
  currentPrice: { type: Number, required: true },
  history: { type: [Number], default: [] },
});

module.exports = mongoose.model('Product', productSchema);
