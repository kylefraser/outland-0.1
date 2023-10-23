import { model, Schema } from 'mongoose';

const schema = new Schema(
  {
    business_name: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      minlength: 5,
    },
    profile: {
      type: String,
    },
    roster: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    listings: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Listing',
      },
    ],
    transactions: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Transaction',
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const BusinessModel = model('business', schema, 'business');
