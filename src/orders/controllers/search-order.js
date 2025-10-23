import { Order } from '../model.js';

export const searchOrder = async (req, res) => {
  try {
    const searchQuery = req.query.q?.trim();

    if (!searchQuery) {
      return res.status(400).json({ message: 'Search query is required' });
    }

    const orders = await Order.find({
      $or: [
        { _id: searchQuery },
        { user: searchQuery },
      ],
    })
      .populate('user', 'name email')
      .populate('orderItems.product', 'name');

    res.status(200).json({
      message: 'Orders fetched successfully',
      count: orders.length,
      orders,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error searching orders', error: error.message });
  }
};
