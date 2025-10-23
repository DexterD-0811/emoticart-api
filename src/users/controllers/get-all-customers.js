import { User } from '../model.js';

export const getAllCustomers = async (req, res) => {
  try {
    const customers = await User.find({ role: 'customer' }).sort({ name: 1 });
    res.status(200).json({
      message: 'Customers retrieved successfully',
      count: customers.length,
      customers,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching customers', error: error.message });
  }
};
