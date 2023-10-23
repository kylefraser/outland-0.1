import { model, Schema } from 'mongoose';

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      minlength: 5,
    },
    phone: {
      type: String,
      minlength: 5,
    },
    street: {
      type: String,
      required: true,
      minlength: 5,
    },
    city: {
      type: String,
      required: true,
      minlength: 3,
    },
  },
  {
    timestamps: true,
  }
);

export const PersonModel = model('person', schema, 'person');
