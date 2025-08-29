import express from 'express';
import { body, param, query } from "express-validator";
import {
  createReview,
  getProductReviews,
  getUserReviews,
  updateReview,
  deleteReview
} from '../controllers/reviewController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import validate from '../middlewares/validation.js';

const router = express.Router();

// Crear una nueva review (usuario autenticado)
router.post(
  '/',
  authMiddleware,
  [
    body('product')
      .notEmpty().withMessage('Product ID is required')
      .isMongoId().withMessage('Product ID must be a valid MongoDB ObjectId'),
    body('rating')
      .notEmpty().withMessage('Rating is required')
      .isInt({ min: 1, max: 5 }).withMessage('Rating must be a number between 1 and 5'),
    body('comment')
      .optional()
      .isLength({ max: 500 }).withMessage('Comment must not exceed 500 characters')
      .trim(),
  ],
  validate,
  createReview
);

// Obtener reviews de un producto específico
router.get(
  '/product/:productId',
  [
    param('productId')
      .isMongoId().withMessage('Product ID must be a valid MongoDB ObjectId'),
  ],
  validate,
  getProductReviews
);

// Obtener reviews del usuario autenticado
router.get('/my-reviews', authMiddleware, getUserReviews);

// Actualizar una review (solo propietario)
router.put(
  '/:reviewId',
  authMiddleware,
  [
    param('reviewId')
      .isMongoId().withMessage('Review ID must be a valid MongoDB ObjectId'),
    body('rating')
      .notEmpty().withMessage('Rating is required')
      .isInt({ min: 1, max: 5 }).withMessage('Rating must be a number between 1 and 5'),
    body('comment')
      .optional()
      .isLength({ max: 500 }).withMessage('Comment must not exceed 500 characters')
      .trim(),
  ],
  validate,
  updateReview
);

// Eliminar una review (solo propietario)
router.delete(
  '/:reviewId',
  authMiddleware,
  [
    param('reviewId')
      .isMongoId().withMessage('Review ID must be a valid MongoDB ObjectId'),
  ],
  validate,
  deleteReview
);

export default router;