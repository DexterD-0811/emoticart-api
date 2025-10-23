import { Category } from '../model.js';

export async function addCategory(req, res) {
  try {
    const { name, description, icon } = req.body;

    const newCategory = new Category({
      name,
      description,
      icon,
    });
    await newCategory.save();

    return res.status(201).json({
      message: `${newCategory.name} added successfully`,
      category: newCategory,
    });
  } catch (error) {
    res.status(400).json({
      message: 'Error adding category',
      error: error.message,
    });
  }
}