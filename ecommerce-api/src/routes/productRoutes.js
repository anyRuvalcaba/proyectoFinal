import express from 'express';
import { body, param, query } from "express-validator";
import {
  getProducts,
  getProductById,
  getProductByCategory,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts
  
} from '../controllers/productController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import isAdmin from '../middlewares/isAdminMiddleware.js';
import validate  from '../middlewares/validation.js';

const router = express.Router();

// Obtener productos paginados
router.get('/products', getProducts);

// Buscar productos con filtros
router.get(
  '/products/search',
  [
    query('minPrice').optional().isFloat({ min: 0 }).withMessage('minPrice debe ser un número positivo'),
    query('maxPrice').optional().isFloat({ min: 0 }).withMessage('maxPrice debe ser un número positivo'),
    query('page').optional().isInt({ min: 1 }).withMessage('page debe ser un número positivo'),
    query('limit').optional().isInt({ min: 1 }).withMessage('limit debe ser un número positivo'),
  ],
  validate,
  searchProducts
);

// Obtener productos por categoría
router.get(
  '/products/category/:idCategory',
  [
    param('idCategory').isMongoId().withMessage('idCategory debe ser un ID válido de MongoDB'),
  ],
  validate,
  getProductByCategory
);

// Obtener producto por ID
router.get(
  '/products/:id',
  [
    param('id').isMongoId().withMessage('ID del producto debe ser un ID válido de MongoDB'),
  ],
  validate,
  getProductById
);

// Crear producto (solo admin)
router.post(
  '/products',
  authMiddleware,
  isAdmin,
  [
    body('name').notEmpty().withMessage('El nombre es obligatorio'),
    body('description').notEmpty().withMessage('La descripción es obligatoria'),
    body('price').isFloat({ min: 1 }).withMessage('El precio debe ser mayor o igual a 1'),
    body('stock').isInt({ min: 0 }).withMessage('El stock debe ser 0 o mayor'),
    body('imagesUrl').isArray({ min: 1 }).withMessage('Debe incluir al menos una URL de imagen'),
    body('category').isMongoId().withMessage('La categoría debe ser un ID válido de MongoDB'),
  ],
  validate,
  createProduct
);

// Actualizar producto (solo admin)
router.put(
  '/products/:id',
  authMiddleware,
  isAdmin,
  [
    param('id').isMongoId().withMessage('ID del producto debe ser un ID válido de MongoDB'),
    body('name').notEmpty().withMessage('El nombre es obligatorio'),
    body('description').notEmpty().withMessage('La descripción es obligatoria'),
    body('price').isFloat({ min: 1 }).withMessage('El precio debe ser mayor o igual a 1'),
    body('stock').isInt({ min: 0 }).withMessage('El stock debe ser 0 o mayor'),
    body('imagesUrl').isArray({ min: 1 }).withMessage('Debe incluir al menos una URL de imagen'),
    body('category').isMongoId().withMessage('La categoría debe ser un ID válido de MongoDB'),
  ],
  validate,
  updateProduct
);

// Eliminar producto (solo admin)
router.delete(
  '/products/:id',
  authMiddleware,
  isAdmin,
  [
    param('id').isMongoId().withMessage('ID del producto debe ser un ID válido de MongoDB'),
  ],
  validate,
  deleteProduct
);

export default router;