import { Product } from '../model.js';

export const getProductByMinMaxPrice = async (req, res) => {
  try {
    const min = parseFloat(req.query.min) || 0;
    const max = parseFloat(req.query.max) || Number.MAX_SAFE_INTEGER;

    const products = await Product.find({
      price: { $gte: min, $lte: max },
    }).sort({ price: 1 });

    res.status(200).json({
      message: `Products filtered by price between ${min} and ${max}`,
      count: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error filtering products by price',
      error: error.message,
    });
  }
};
