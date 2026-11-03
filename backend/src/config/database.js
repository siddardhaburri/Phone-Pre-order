import mongoose from 'mongoose';

/**
 * MongoDB Atlas Connection Manager
 */
class Database {
  constructor() {
    this.isConnected = false;
  }

  /**
   * Connect to MongoDB Atlas
   */
  async connect() {
    const uri = process.env.MONGODB_URI?.trim();

    if (!uri) {
      console.warn(
        '[Database] Notice: MONGODB_URI is not configured in environment variables. Running in unconfigured database mode.'
      );
      this.isConnected = false;
      return false;
    }

    try {
      // Set mongoose connection options
      mongoose.set('strictQuery', true);

      // Event listeners for connection monitoring
      mongoose.connection.on('connected', () => {
        this.isConnected = true;
        console.log('[Database] Mongoose event: connected to MongoDB Atlas');
      });

      mongoose.connection.on('error', (err) => {
        this.isConnected = false;
        console.error('[Database] Mongoose connection error event:', err.message);
      });

      mongoose.connection.on('disconnected', () => {
        this.isConnected = false;
        console.warn('[Database] Mongoose event: disconnected from MongoDB');
      });

      const conn = await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of hanging
      });

      this.isConnected = true;
      console.log(`[Database] MongoDB Atlas Connected: ${conn.connection.host}`);
      return true;
    } catch (error) {
      this.isConnected = false;
      console.error(`[Database] MongoDB Atlas Connection Failure: ${error.message}`);
      console.warn('[Database] Server will continue operating safely without database connectivity.');
      return false;
    }
  }

  /**
   * Get current database status
   */
  getStatus() {
    const states = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting',
      99: 'uninitialized'
    };

    const readyState = mongoose.connection.readyState;

    return {
      status: !process.env.MONGODB_URI?.trim() ? 'unconfigured' : states[readyState] || 'unknown',
      connected: readyState === 1,
      host: mongoose.connection.host || null,
      name: mongoose.connection.name || null
    };
  }

  /**
   * Disconnect from database gracefully
   */
  async disconnect() {
    if (this.isConnected) {
      await mongoose.disconnect();
      this.isConnected = false;
      console.log('[Database] MongoDB connection closed gracefully.');
    }
  }
}

export const db = new Database();
export default db;

