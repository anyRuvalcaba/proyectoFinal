import express from 'express';
import { body, param, query } from "express-validator";
import {
  getOrders,
  getOrderById,
  getOrdersByUser,
  createOrder,
  updateOrder,
  cancelOrder,
  updateOrderStatus,
  updatePaymentStatus,
  deleteOrder,
} from '../controllers/orderController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import isAdmin from '../middlewares/isAdminMiddleware.js';
import validate from '../middlewares/validation.js';

const router = express.Router();

// Obtener todas las órdenes (admin)
router.get('/orders', authMiddleware, isAdmin, getOrders);

// Obtener órdenes por usuario
router.get(
  '/orders/user/:userId',
  [
    param('userId').isMongoId().withMessage('User ID must be a valid MongoDB ObjectId'),
  ],
  validate,
  authMiddleware,
  getOrdersByUser
);

// Obtener orden por ID
router.get(
  '/orders/:id',
  [
    param('id').isMongoId().withMessage('Order ID must be a valid MongoDB ObjectId'),
  ],
  validate,
  authMiddleware,
  getOrderById
);

// Crear nueva orden
router.post(
  '/orders',
  [
    body('user').notEmpty().withMessage('User ID is required').isMongoId(),
    body('products').isArray({ min: 1 }).withMessage('Products array is required'),
    body('products.*.productId').notEmpty().withMessage('Product ID is required').isMongoId(),
    body('products.*.quantity').isInt({ min: 1 }).withMessage('Quantity must be >= 1'),
    body('products.*.price').isFloat({ min: 0 }).withMessage('Price must be >= 0'),
    body('paymentMethod').notEmpty().withMessage('Payment method is required').isMongoId(),
  ],
  validate,
  authMiddleware,
  createOrder
);

// Cancelar orden (función especial)
router.patch(
  '/orders/:id/cancel',
  [
    param('id').isMongoId().withMessage('Order ID must be a valid MongoDB ObjectId'),
  ],
  validate,
  authMiddleware,
  isAdmin,
  cancelOrder
);

// Actualizar solo el estado de la orden
router.patch(
  '/orders/:id/status',
  [
    param('id').isMongoId().withMessage('Order ID must be a valid MongoDB ObjectId'),
    body('status').isIn(['pending', 'processing', 'cancelled'])
      .withMessage('Invalid status'),
  ],
  validate,
  authMiddleware,
  isAdmin,
  updateOrderStatus
);

// Actualizar solo el estado de pago
router.patch(
  '/orders/:id/payment-status',
  [
    param('id').isMongoId().withMessage('Order ID must be a valid MongoDB ObjectId'),
    body('paymentStatus').isIn(['pending', 'paid', 'failed', 'refunded'])
      .withMessage('Invalid payment status'),
  ],
  validate,
  authMiddleware,
  isAdmin,
  updatePaymentStatus
);

// Actualizar orden completa
router.put(
  '/orders/:id',
  [
    param('id').isMongoId().withMessage('Order ID must be a valid MongoDB ObjectId'),
    body('status').optional().isIn(['pending', 'processing', 'cancelled']),
    body('paymentStatus').optional().isIn(['pending', 'paid', 'failed', 'refunded']),
  ],
  validate,
  authMiddleware,
  isAdmin,
  updateOrder
);

// Eliminar orden (solo si está cancelada)
router.delete(
  '/orders/:id',
  [
    param('id').isMongoId().withMessage('Order ID must be a valid MongoDB ObjectId'),
  ],
  validate,
  authMiddleware,
  isAdmin,
  deleteOrder
);

export default router;