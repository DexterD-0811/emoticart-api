import { User } from '../model.js';

export const searchCustomer = async (req, res) => {
  try {
    const query = req.query.q || '';
    const regex = new RegExp(query, 'i');

    const customers = await User.find({
      role: 'customer',
      $or: [{ name: regex }, { email: regex }],
    }).sort({ name: 1 });

    res.status(200).json({
      message: 'Customers fetched successfully',
      count: customers.length,
      customers,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error searching customers', error: error.message });
  }
};
