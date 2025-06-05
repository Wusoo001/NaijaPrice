const mongoose = require('mongoose');
const Price = require('./models/price');

const mongoUri = 'mongodb://localhost:27017/FoodPrices';

const mockData = [
  { state: 'Lagos', food: 'rice', currentPrice: 120, history: [110, 115, 120] },
  { state: 'Lagos', food: 'yam', currentPrice: 150, history: [140, 145, 150] },
  { state: 'Kano', food: 'rice', currentPrice: 110, history: [105, 108, 110] },
  { state: 'Kano', food: 'yam', currentPrice: 140, history: [135, 138, 140] },
  // add more mock entries for other states and foods
];

async function seed() {
  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await Price.deleteMany(); // clear existing
    await Price.insertMany(mockData);
    console.log('Mock data inserted!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
