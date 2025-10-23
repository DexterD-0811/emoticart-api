import { Category } from '../model.js';

export const searchCategory = async (req, res) => {
  try {
    const searchQuery = req.query.q || '';
    const regex = new RegExp(searchQuery, 'i');
    const categories = await Category.find({ name: regex }).sort({ name: 1 });

    res.status(200).json({
      message: 'Categories fetched successfully',
      count: categories.length,
      categories,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error searching categories',
      error: error.message,
    });
  }
};
