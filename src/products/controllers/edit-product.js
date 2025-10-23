import { Product } from '../model.js';

export const editProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedProduct)
      return res.status(404).json({ message: 'Product not found' });

    res.status(200).json({
      message: `${updatedProduct.name} updated successfully`,
      product: updatedProduct,
    });
  } catch (error) {
    res.status(400).json({
      message: 'Error updating product',
      error: error.message,
    });
  }
};
