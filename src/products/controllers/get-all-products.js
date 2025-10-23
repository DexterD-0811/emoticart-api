import { Product } from '../model.js';

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ name: 1 });
    res.status(200).json({
      message: 'Products retrieved successfully',
      products,
    });
  } catch (error) {
    res.status(400).json({
      message: 'Error retrieving products',
      error: error.message,
    });
  }
};
