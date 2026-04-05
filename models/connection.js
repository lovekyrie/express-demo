const mongoose = require('mongoose');

const mongoDB = 'mongodb://fengdurant:Aa123456%40@107.182.31.17:27017/';

mongoose.connect(mongoDB)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

module.exports = mongoose;
