import { Router } from 'express';
import { createPreOrder, getPreOrderById } from '../controllers/preOrderController.js';

const router = Router();

// POST /api/preorders - Register a customer pre-order
router.post('/', createPreOrder);

// GET /api/preorders/:bookingId - Retrieve pre-order details
router.get('/:bookingId', getPreOrderById);

export default router;

