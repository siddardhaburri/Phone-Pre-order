import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Resolve directory and ensure environment variables are loaded
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

import routes from './routes/index.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

// Trust reverse proxy headers (required on Render, Vercel, Heroku for correct client IP detection)
app.set('trust proxy', 1);

/**
 * Configure Allowed Origins for CORS
 * Reads from process.env.CLIENT_ORIGIN and includes required frontend origins.
 */
const parseOrigins = () => {
  const envOrigins = (process.env.CLIENT_ORIGIN || '')
    .split(',')
    .map(o => o.trim().replace(/\/$/, ''))
    .filter(Boolean);

  const localDevOrigins = [
    'http://localhost:5174',
    'http://127.0.0.1:5174',
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'http://localhost:3000',
    'http://192.168.1.2:5173',
    'http://192.168.1.2:5174'
  ];

  // In production, strictly enforce CLIENT_ORIGIN if provided, otherwise allow local fallback
  if (process.env.NODE_ENV === 'production' && envOrigins.length > 0) {
    return Array.from(new Set(envOrigins));
  }

  return Array.from(new Set([...envOrigins, ...localDevOrigins]));
};

const allowedOrigins = parseOrigins();

const corsOptions = {
  origin: (origin, callback) => {
    // Allow non-browser requests (e.g. curl, server-to-server, mobile app) without origin header
    if (!origin) {
      return callback(null, true);
    }

    const normalizedOrigin = origin.trim().replace(/\/$/, '');

    if (allowedOrigins.includes(normalizedOrigin)) {
      return callback(null, true);
    }

    // In development mode, allow connections from local network devices (e.g. mobile phones on Wi-Fi)
    if (process.env.NODE_ENV !== 'production' && /^http:\/\/(localhost|127\.0\.0\.1|192\.168\.\d+\.\d+|10\.\d+\.\d+\.\d+|172\.(1[6-9]|2\d|3[01])\.\d+\.\d+)(:\d+)?$/.test(normalizedOrigin)) {
      return callback(null, true);
    }

    console.warn(`[CORS] Blocked unauthorized request from origin: ${origin}`);
    return callback(new Error(`CORS Policy: Access from origin '${origin}' is not allowed.`));
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  credentials: true,
  maxAge: 86400 // 24 hours
};

// Enable CORS with preflight support across all routes
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// Express JSON and URL-encoded body parsing middleware
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// Root welcome / discovery endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    service: 'NEXTGEN MOBILE Backend API',
    status: 'online',
    documentation: '/api/health',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api', routes);

// 404 Handler for undefined routes
app.use(notFoundHandler);

// Centralized Error Handling Middleware
app.use(errorHandler);

export default app;
