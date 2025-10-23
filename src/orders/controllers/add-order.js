import { Order } from '../model.js';

export const addOrder = async (req, res) => {
  try {
    const { user, orderItems, shippingAddress, totalPrice, status, paidAt, deliveredAt } = req.body;

    const newOrder = new Order({
      user,
      orderItems,
      shippingAddress,
      totalPrice,
      status,
      paidAt,
      deliveredAt,
    });

    await newOrder.save();

    res.status(201).json({
      message: 'Order created successfully',
      order: newOrder,
    });
  } catch (error) {
    res.status(400).json({ message: 'Error creating order', error: error.message });
  }
};
