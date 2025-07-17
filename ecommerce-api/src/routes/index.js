import express from 'express';

import productRoutes from './productRoutes.js';
import categoryRoutes from './categoryRoutes.js';

const router = express.Router();
router.use(productRoutes);
router.use(categoryRoutes);


export default router;