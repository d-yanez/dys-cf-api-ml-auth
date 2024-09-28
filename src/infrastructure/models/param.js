const mongoose = require('mongoose');

const paramSchema = new mongoose.Schema({
  name: String,
  type: String,
  value: String,
});

module.exports = mongoose.model('Param', paramSchema);
