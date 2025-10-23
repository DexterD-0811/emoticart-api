import { Schema, model } from 'mongoose';

const orderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, "User reference is required."],
  },
  orderItems: [{
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
  shippingAddress: {
    address: { type: String, required: [true, "Shipping address is required."] },
    city: { type: String, required: [true, "City is required."] },
    postalCode: { type: String, required: [true, "Postal code is required."] },
    country: { type: String, required: [true, "Country is required."] },
  },
  totalPrice: {
    type: Number,
    required: [true, "Total price is required."],
  },
  status: {
    type: String,
    enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Pending',
  },
  paidAt: Date,
  deliveredAt: Date,
}, {
  timestamps: true,
});

export const Order = model('Order', orderSchema);