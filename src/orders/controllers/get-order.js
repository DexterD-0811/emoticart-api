import { Order } from '../model.js';

export const getOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id)
      .populate('user', 'name email')
      .populate('orderItems.product', 'name price icon');

    if (!order) return res.status(404).json({ message: 'Order not found' });

    res.status(200).json({ message: 'Order retrieved successfully', order });
  } catch (error) {
    res.status(400).json({ message: 'Error fetching order', error: error.message });
  }
};
