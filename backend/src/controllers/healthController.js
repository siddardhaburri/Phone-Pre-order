import { db } from '../config/database.js';

/**
 * Health Check Controller
 * GET /api/health
 */
export const getHealth = (req, res) => {
  const dbStatus = db.getStatus();

  const responsePayload = {
    api: {
      name: 'NEXTGEN MOBILE Backend API',
      status: 'healthy',
      version: '1.0.0'
    },
    server: {
      status: 'online',
      environment: process.env.NODE_ENV || 'development',
      uptimeSeconds: Math.floor(process.uptime()),
      memoryUsage: {
        rssMB: Math.round((process.memoryUsage().rss / 1024 / 1024) * 100) / 100,
        heapUsedMB: Math.round((process.memoryUsage().heapUsed / 1024 / 1024) * 100) / 100
      }
    },
    database: {
      status: dbStatus.status,
      connected: dbStatus.connected,
      host: dbStatus.host
    },
    timestamp: new Date().toISOString()
  };

  res.status(200).json(responsePayload);
};

export default {
  getHealth
};

