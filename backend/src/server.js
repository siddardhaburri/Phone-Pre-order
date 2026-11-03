import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Resolve directory name for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from backend/.env
dotenv.config({ path: path.resolve(__dirname, '../.env') });

import app from './app.js';
import { db } from './config/database.js';

const PORT = parseInt(process.env.PORT || '5000', 10);
const NODE_ENV = process.env.NODE_ENV || 'development';

/**
 * Start the HTTP Server and initialize Database Connection
 */
const startServer = async () => {
  try {
    // Attempt database connection (handles errors safely without crashing server)
    await db.connect();

    // Start Express listener
    const server = app.listen(PORT, () => {
      console.log('====================================================');
      console.log(`🚀 NEXTGEN MOBILE Backend running in [${NODE_ENV}] mode`);
      console.log(`📡 Server URL:   http://localhost:${PORT}`);
      console.log(`🩺 Health Check: http://localhost:${PORT}/api/health`);
      console.log(`🌐 Allowed CORS: ${process.env.CLIENT_ORIGIN || 'http://localhost:5174, http://localhost:5173'}`);
      console.log('====================================================');
    });

    // Graceful Shutdown Handlers
    const handleShutdown = async (signal) => {
      console.log(`\n[Process] Received ${signal}. Initiating graceful shutdown...`);

      server.close(async () => {
        console.log('[Server] HTTP server closed.');
        try {
          await db.disconnect();
        } catch (err) {
          console.error('[Database] Error during disconnect:', err.message);
        }
        console.log('[Process] Graceful shutdown complete. Exiting.');
        process.exit(0);
      });

      // Force exit if shutdown takes too long
      setTimeout(() => {
        console.error('[Process] Forced shutdown after timeout.');
        process.exit(1);
      }, 10000).unref();
    };

    process.on('SIGTERM', () => handleShutdown('SIGTERM'));
    process.on('SIGINT', () => handleShutdown('SIGINT'));

    return server;
  } catch (error) {
    console.error('[Server] Fatal startup error:', error.message);
    process.exit(1);
  }
};

startServer();
