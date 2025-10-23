import { Category } from '../model.js';

export const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;

    const deletedCategory = await Category.findByIdAndDelete(categoryId);

    if (!deletedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json({
      message: `Category "${deletedCategory.name}" deleted successfully`,
      category: deletedCategory,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting category',
      error: error.message,
    });
  }
};
