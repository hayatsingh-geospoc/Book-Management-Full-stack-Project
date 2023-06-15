import mongoose from 'mongoose';

const bookModel = mongoose.Schema(
  {
    title: { required: true, type: String, trim: true },
    excerpt: { required: true, type: String, trim: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'HayUser' }, // ref: 'HayUser' is the name of the model  we want to refer to
    ISBN: { type: String, trim: true }, // typeof is a keyword
    category: { type: String, required: true },
    subcategory: { type: String, required: true },
    reviews: { type: Number, default: 0 },
    deletedAt: { type: Date, trim: true },
    isDeleted: { type: Boolean, default: false },
    releasedOn: { type: Date, required: true },
  },
  { timestamps: true }
);

const Books = mongoose.model('HayBook', bookModel);

export default Books;

// function to get all books  from the mongodb database
