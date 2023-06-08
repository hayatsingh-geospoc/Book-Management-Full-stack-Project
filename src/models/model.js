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
      minlength: [8, 'Password should have a minimum length of 8 characters'],
      maxlength: [20, 'Password should have a maximum length of 20 characters'],
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
