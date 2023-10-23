import { model, Schema } from 'mongoose';

const schema = new Schema({
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

export const GeoModel = model('geo', schema, 'geo');
