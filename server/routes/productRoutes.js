import express from 'express';
import { getProducts, getProductById, deleteProduct, createProduct, updateProduct } from '../controllers/productController.js';
import { isAdmin } from '../middleware/adminMiddleware.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/') 
       .get(getProducts)
       .post(protect, isAdmin, createProduct);

router.route('/:id') 
        .get(getProductById)
        .delete(protect,isAdmin,deleteProduct)
        .put(protect, isAdmin, updateProduct)

export default router;