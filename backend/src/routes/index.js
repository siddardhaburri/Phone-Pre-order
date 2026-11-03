import { Router } from 'express';
import healthRoutes from './healthRoutes.js';
import preOrderRoutes from './preOrderRoutes.js';

const router = Router();

// Mount Health Check Route
router.use('/health', healthRoutes);

// Mount Pre-Order Registration Route
router.use('/preorders', preOrderRoutes);

export default router;
