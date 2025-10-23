import { Category } from '../model.js';

export const getCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;

    // Find category by ID
    const category = await Category.findById(categoryId);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json({
      message: 'Category fetched successfully',
      category,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching category',
      error: error.message,
    });
  }
};
