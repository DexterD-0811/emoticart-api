import { Schema, model } from 'mongoose';

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, "Product name is required."],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Product description is required."],
  },
  price: {
    type: Number,
    required: [true, "Product price is required."],
    min: [0, "Price cannot be negative."],
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, "Product category is required."],
  },
  icon: {
    type: String,
    required: [true, "Product icon URL is required."],
  },
  stock: {
    type: Number,
    default: 0,
    min: [0, "Stock cannot be negative."],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

export const Product = model('Product', productSchema);