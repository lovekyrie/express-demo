const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExampleModelSchema = new Schema({
  a_string: String,
  a_date: Date,
});

const ExampleModel = mongoose.model('ExampleModel', ExampleModelSchema);

module.exports = ExampleModel;
