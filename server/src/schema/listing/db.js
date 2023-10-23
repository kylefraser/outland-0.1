import { model, Schema } from 'mongoose';

const schema = new Schema(
  {
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    name: {
      type: String,
      minlength: 2,
    },
    description: {
      type: String,
      minlength: 2,
    },
    address: {
      type: String,
      minlength: 2,
    },
    city: {
      type: String,
      minlength: 2,
    },
    state: {
      type: String,
      minlength: 2,
    },
    instructor: {
      type: String,
      minlength: 2,
    },
    maxCount: {
      type: Number,
      minlength: 1,
    },
    minCount: {
      type: Number,
      minlength: 1,
    },
    equipment: {
      type: String,
      minlength: 2,
    },
    requirements: {
      type: String,
      minlength: 2,
    },
    restrictions: {
      type: String,
      minlength: 2,
    },
    duration: {
      type: String,
      minlength: 2,
    },
    courseType: {
      type: String,
      minlength: 2,
    },
    skillLevel: {
      type: String,
      minlength: 2,
    },
    rating: {
      type: String,
      minlength: 2,
    },
    price: {
      type: String,
      minlength: 2,
    },
    type: {
      type: String,
      minlength: 2,
    },
    date: {
      type: String,
      minlength: 2,
    },
    time: {
      type: String,
      minlength: 2,
    },
    lng: {
      type: Number,
      minlength: 1,
    },
    lat: {
      type: Number,
      minlength: 1,
    },
  },
  {
    timestamps: true,
  }
);

export const ListingModel = model('listing', schema, 'listing');
