import express from 'express';
import {
  getCarts,
  getCartById,
  getCartByUser,
  createCart,
  updateCart,
  deleteCart,
  addProductToCart,
} from '../controllers/cartController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import isAdmin from '../middlewares/isAdminMiddleware.js';
import validate from '../middlewares/validation.js';
import { body, param, query } from "express-validator";

const router = express.Router();

// Validaciones comunes
const cartValidations = [
  body("user")
    .isMongoId().withMessage("User must be a valid MongoDB ObjectId"),

  body("products")
    .isArray({ min: 1 }).withMessage("Products must be a non-empty array"),

  body("products.*.product")
    .isMongoId().withMessage("Each product must be a valid MongoDB ObjectId"),

  body("products.*.quantity")
    .isInt({ min: 1 }).withMessage("Quantity must be an integer >= 1"),
];

// Obtener todos los carritos (admin)
router.get('/cart', authMiddleware, isAdmin, getCarts);

// Obtener carrito por ID
router.get(
  '/cart/:id',
  [
    param("id")
      .isMongoId().withMessage("Cart ID must be a valid MongoDB ObjectId"),
    validate,
  ],
  authMiddleware,
  isAdmin,
  getCartById
);

// Obtener carrito por usuario
router.get(
  '/cart/user/:id',
  [
    param("id")
      .isMongoId().withMessage("User ID must be a valid MongoDB ObjectId"),
    validate,
  ],
  authMiddleware,
  getCartByUser
);

// Crear nuevo carrito
router.post(
  '/cart',
  cartValidations,
  validate,
  authMiddleware,
  createCart
);

// Agregar producto al carrito
router.post(
  '/cart/add-product',
  [
    body("userId")
      .isMongoId().withMessage("User ID must be a valid MongoDB ObjectId"),

    body("productId")
      .isMongoId().withMessage("Product ID must be a valid MongoDB ObjectId"),

    body("quantity")
      .optional()
      .isInt({ min: 1 }).withMessage("Quantity must be an integer >= 1"),
    validate,
  ],
  authMiddleware,
  addProductToCart
);

// Actualizar carrito completo
router.put(
  '/cart/:id',
  [
    param("id")
      .isMongoId().withMessage("Cart ID must be a valid MongoDB ObjectId"),

    ...cartValidations,
    validate,
  ],
  authMiddleware,
  updateCart
);

// Eliminar carrito
router.delete(
  '/cart/:id',
  [
    param("id")
      .isMongoId().withMessage("Cart ID must be a valid MongoDB ObjectId"),
    validate,
  ],
  authMiddleware,
  deleteCart
);

export default router;