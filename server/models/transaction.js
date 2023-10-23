const mongoose = require('mongoose');

// TODO: Update schemas with actual requirements
const schema = new mongoose.Schema(
  {
    payee_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    receiver_id: {
      type: String,
      minlength: 1,
    },
    listing_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Listing',
    },
    name: {
      type: String,
      minlength: 1,
    },
    email: {
      type: String,
      minlength: 1,
    },
    price: {
      type: Number,
      minlength: 1,
    },
    amount: {
      type: Number,
      minlength: 1,
    },
    site_fee: {
      type: Number,
      minlength: 1,
    },
    tickets: {
      type: Number,
      minlength: 1,
    },
    refund: {
      type: String,
      minlength: 1,
    },
    coupon: {
      type: String,
      minlength: 1,
    },
    discount_amt: {
      type: Number,
      minlength: 1,
    },
    status: {
      type: String,
      minlength: 1,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Transaction', schema);
