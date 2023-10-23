import { model, Schema } from 'mongoose';

const schema = new Schema(
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
      minlength: 5,
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
        type: Schema.Types.ObjectId,
        ref: 'Person',
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
    business: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Business',
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const UserModel = model('user', schema, 'user');
