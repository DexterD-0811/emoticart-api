import { Product } from '../model.js';

export const addProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json({
      message: `${product.name} added successfully`,
      product,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: 'Product with this name already exists',
      });
    }
    res.status(400).json({
      message: 'Error adding product',
      error: error.message,
    });
  }
};
