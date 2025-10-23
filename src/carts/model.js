import { Schema, model } from 'mongoose';

const cartSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, "User reference is required."],
  },
  cartItems: [{
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: [true, "Product reference is required."],
    },
    name: String,
    quantity: Number,
    price: Number,
    icon: String,
  }],
}, {
  timestamps: true,
});

export const Cart = model('Cart', cartSchema);