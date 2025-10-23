import { Product } from '../model.js';

export const searchProduct = async (req, res) => {
  try {
    const q = req.query.q || '';
    const regex = new RegExp(q, 'i');

    const products = await Product.find({ name: regex }).sort({ name: 1 });

    res.status(200).json({
      message: 'Products fetched successfully',
      count: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error searching products',
      error: error.message,
    });
  }
};
