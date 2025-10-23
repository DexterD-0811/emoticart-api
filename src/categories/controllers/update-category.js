import { Category } from '../model.js';

export const updateCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const updateData = req.body;

    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json({
      message: `Category "${updatedCategory.name}" updated successfully`,
      category: updatedCategory,
    });
  } catch (error) {
    res.status(400).json({
      message: 'Error updating category',
      error: error.message,
    });
  }
};
