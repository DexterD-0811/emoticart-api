import { Category } from "../model.js";

export async function getAllCategories(req, res) {
  try {
    const categories = await Category.find().sort({ name: 1 });
    
    res.status(200).json({
      message: "Categories retrieved successfully",
      categories,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error retrieving categories",
      error: error.message,
    }); 
  }
}