const mongoose = require('mongoose');

// TODO: Update schemas with actual requirements
const schema = new mongoose.Schema({
  city: {
    type: String,
  },
  state_name: {
    type: String,
  },
  state_id: {
    type: String,
  },
  zips: {
    type: String,
  },
  timezone: {
    type: String,
  },
  lat: {
    type: String,
  },
  lng: {
    type: String,
  },
});

module.exports = mongoose.model('Geo', schema);
