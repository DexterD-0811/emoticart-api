import { Schema, model } from 'mongoose';

const categorySchema = new Schema({
  name: {
    type: String,
    required: [true, "Category name is required."],
    trim: true,
    unique: true,
  },
  description: {
    type: String,
  },
  icon: {
    type: String,
    required: [true, "Category icon URL is required."],
  },
}, {
  timestamps: true,
});

export const Category = model('Category', categorySchema);