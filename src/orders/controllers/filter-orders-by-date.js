import { Order } from '../model.js';

export const filterOrdersByDate = async (req, res) => {
  try {
    const { from, to } = req.query;

    const fromDate = from ? new Date(from) : new Date('1970-01-01');
    const toDate = to ? new Date(to) : new Date();

    const orders = await Order.find({
      createdAt: { $gte: fromDate, $lte: toDate },
    })
      .populate('user', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: 'Orders filtered by date successfully',
      count: orders.length,
      orders,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error filtering orders', error: error.message });
  }
};
