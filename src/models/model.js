import mongoose from 'mongoose';

export const userModel = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      enum: ['Mr', 'Mrs', 'Miss'],
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlen: 8,
      maxlen: 20,
    },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      pincode: { type: String, required: true },
    },
  },
  { timestamps: true }
);

const Users = mongoose.model('HayUser', userModel);

export default Users;
