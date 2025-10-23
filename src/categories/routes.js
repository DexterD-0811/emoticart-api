import express from "express";
import { searchCategory } from "./controllers/search-category.js";
import { getCategory } from "./controllers/get-category.js";
import { updateCategory } from "./controllers/update-category.js";
import { deleteCategory } from "./controllers/delete-category.js";
import { addCategory } from "./controllers/add-category.js";
import { getAllCategories } from "./controllers/get-all-categories.js";
import { getCategoriesByProductCount } from "./controllers/get-categories-by-product-count.js";

const router = express.Router();

router.get("/", getAllCategories);
router.get("/search", searchCategory);
router.get("/by-product-count", getCategoriesByProductCount);
router.get("/:id", getCategory);
router.post("/", addCategory);
router.patch("/:id", updateCategory);
router.delete("/:id", deleteCategory);

export default router;