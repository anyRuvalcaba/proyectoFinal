import express from 'express';
import {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../controllers/categoryController';

const router = express.Router();

router.get('/category', getCategories);
router.get('/category/:id', getCategoryById);
router.post('/category', createCategory);
router.put('/category/:id', updateCategory);
router.delete('/category/:id', deleteCategory);

export default router;