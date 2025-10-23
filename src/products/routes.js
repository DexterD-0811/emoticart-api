import express from 'express';

import { addProduct } from './controllers/add-product.js';
import { getAllProducts } from './controllers/get-all-products.js';
import { getProduct } from './controllers/get-product.js';
import { editProduct } from './controllers/edit-product.js';
import { deleteProduct } from './controllers/delete-product.js';
import { searchProduct } from './controllers/search-product.js';
import { getProductByMinMaxPrice } from './controllers/get-product-by-price.js';
import { getProductByCategory } from './controllers/get-product-by-category.js';

const router = express.Router();

router.post('/', addProduct);
router.get('/', getAllProducts);
router.get('/search', searchProduct);
router.get('/filter-by-price', getProductByMinMaxPrice);
router.get('/filter-by-category', getProductByCategory);
router.get('/:id', getProduct);
router.patch('/:id', editProduct);
router.delete('/:id', deleteProduct);

export default router;
