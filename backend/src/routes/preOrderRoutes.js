import { Router } from 'express';
import { createPreOrder, getPreOrderById } from '../controllers/preOrderController.js';
import { preOrderLimiter } from '../middleware/rateLimiter.js';

const router = Router();

// POST /api/preorders - Register a customer pre-order (Rate-limited)
router.post('/', preOrderLimiter, createPreOrder);

// GET /api/preorders/:bookingId - Retrieve pre-order details (PII-masked)
router.get('/:bookingId', getPreOrderById);

export default router;

