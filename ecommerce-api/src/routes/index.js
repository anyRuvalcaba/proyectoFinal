import express from 'express';

import authRoutes from './authRoutes.js';
import cartRoutes from './cartRoutes.js';
import categoryRoutes from './categoryRoutes.js';
import notificationRoutes from './notificationRoutes.js';
import orderRoutes from './orderRoutes.js';
import paymentMethodRoutes from './paymentMethodRoutes.js';
import productRoutes from './productRoutes.js';
import reviewRoutes from './reviewRoutes.js';
import userRoutes from './userRoutes.js';
import wishlistRoutes from './wishlistRoutes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/cart', cartRoutes);
router.use('/category', categoryRoutes);
router.use('/notification', notificationRoutes);
router.use('/order', orderRoutes);
router.use('/payment-method', paymentMethodRoutes);
router.use('/product', productRoutes);
router.use('/review', reviewRoutes);
router.use('/user', userRoutes);
router.use('/wishlist', wishlistRoutes);

export default router;