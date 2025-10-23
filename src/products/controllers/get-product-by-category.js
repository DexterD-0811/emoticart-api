import { Product } from '../model.js';

export const getProductByCategory = async (req, res) => {
  try {
    const categoryId = req.query.category;
    if (!categoryId) {
      return res.status(400).json({ message: 'Category ID is required' });
    }

    const products = await Product.find({ category: categoryId }).sort({ name: 1 });

    res.status(200).json({
      message: `Products filtered by category ${categoryId}`,
      count: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error filtering products by category',
      error: error.message,
    });
  }
};
