import { Product } from '../model.js';

export const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct)
      return res.status(404).json({ message: 'Product not found' });

    res.status(200).json({
      message: `${deletedProduct.name} deleted successfully`,
    });
  } catch (error) {
    res.status(400).json({
      message: 'Error deleting product',
      error: error.message,
    });
  }
};
