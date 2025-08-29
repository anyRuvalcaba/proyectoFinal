import express from 'express';
import { body, param, query } from "express-validator";
import {
  getPaymentMethods,
  getPaymentMethodById,
  getPaymentMethodsByUser,
  createPaymentMethod,
  updatePaymentMethod,
  setDefaultPaymentMethod,
  deactivatePaymentMethod,
  deletePaymentMethod,
  getDefaultPaymentMethod,
} from '../controllers/paymentMethodController.js';
import isAdmin from '../middlewares/isAdminMiddleware.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import validate from '../middlewares/validation.js';

const router = express.Router();

// Obtener todos los métodos de pago activos (admin)
router.get('/payment-methods', authMiddleware, isAdmin, getPaymentMethods);

// Obtener método de pago predeterminado de un usuario
router.get(
  '/payment-methods/default/:userId',
  [
    param('userId').isMongoId().withMessage('User ID must be a valid MongoDB ObjectId'),
  ],
  validate,
  authMiddleware,
  getDefaultPaymentMethod
);

// Obtener métodos de pago de un usuario
router.get(
  '/payment-methods/user/:userId',
  [
    param('userId').isMongoId().withMessage('User ID must be a valid MongoDB ObjectId'),
  ],
  validate,
  authMiddleware,
  getPaymentMethodsByUser
);

// Obtener método de pago por ID
router.get(
  '/payment-methods/:id',
  [
    param('id').isMongoId().withMessage('Payment method ID must be a valid MongoDB ObjectId'),
  ],
  validate,
  authMiddleware,
  getPaymentMethodById
);

// Crear nuevo método de pago
router.post(
  '/payment-methods',
  [
    body('user').notEmpty().withMessage('User ID is required').isMongoId(),
    body('type')
      .notEmpty().withMessage('Type is required')
      .isIn(['credit_card', 'debit_card', 'paypal'])
      .withMessage('Invalid payment type'),
    body('cardNumber').optional().isLength({ min: 16, max: 16 }).withMessage('Card number must be 16 digits'),
    body('cardHolderName').optional().isString(),
    body('expiryDate').optional().matches(/^(0[1-9]|1[0-2])\/\d{2}$/).withMessage('Expiry date must be MM/YY'),
    body('paypalEmail').optional().isEmail().withMessage('Invalid PayPal email format'),
    body('isDefault').optional().isBoolean(),
  ],
  validate,
  authMiddleware,
  createPaymentMethod
);

// Establecer método de pago como predeterminado
router.patch(
  '/payment-methods/:id/set-default',
  [
    param('id').isMongoId().withMessage('Payment method ID must be a valid MongoDB ObjectId'),
  ],
  validate,
  authMiddleware,
  setDefaultPaymentMethod
);

// Desactivar método de pago
router.patch(
  '/payment-methods/:id/deactivate',
  [
    param('id').isMongoId().withMessage('Payment method ID must be a valid MongoDB ObjectId'),
  ],
  validate,
  authMiddleware,
  deactivatePaymentMethod
);

// Actualizar método de pago
router.put(
  '/payment-methods/:id',
  [
    param('id').isMongoId().withMessage('Payment method ID must be a valid MongoDB ObjectId'),
    body('cardNumber').optional().isLength({ min: 16, max: 16 }).withMessage('Card number must be 16 digits'),
    body('expiryDate').optional().matches(/^(0[1-9]|1[0-2])\/\d{2}$/).withMessage('Expiry date must be MM/YY'),
    body('paypalEmail').optional().isEmail().withMessage('Invalid PayPal email format'),
    body('isDefault').optional().isBoolean(),
    body('isActive').optional().isBoolean(),
  ],
  validate,
  authMiddleware,
  updatePaymentMethod
);

// Eliminar método de pago permanentemente
router.delete(
  '/payment-methods/:id',
  [
    param('id').isMongoId().withMessage('Payment method ID must be a valid MongoDB ObjectId'),
  ],
  validate,
  authMiddleware,
  deletePaymentMethod
);

export default router;