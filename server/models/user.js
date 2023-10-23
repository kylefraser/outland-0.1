const mongoose = require('mongoose');

// TODO: Update schemas with actual requirements
const schema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      minlength: 5,
    },
    about: {
      type: String,
    },
    avatar: {
      type: String,
    },
    stripe_id: {
      type: String,
    },
    isBusiness: {
      type: Boolean,
    },
    profile: {
      type: String,
    },
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Person',
      },
    ],
    listings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Listing',
      },
    ],
    transactions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transaction',
      },
    ],
    business: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Business',
      },
    ],
    favorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Listing',
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', schema);
