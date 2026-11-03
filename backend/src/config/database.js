import mongoose from 'mongoose';

/**
 * Safely extracts non-sensitive connection parameters for diagnostic logging.
 * Never prints passwords, usernames, or sensitive auth tokens.
 */
const getSafeConnectionDiagnostics = (rawUri) => {
  if (!rawUri || typeof rawUri !== 'string') {
    return { configured: false, reason: 'URI is empty or undefined' };
  }

  const cleaned = rawUri.trim().replace(/^["']|["']$/g, '');

  let protocol = 'unknown';
  let host = 'unknown';
  let dbName = 'default (unspecified)';
  let queryParams = [];
  let hasUsername = false;
  let hasPassword = false;
  let multipleAtWarning = false;

  try {
    const protoMatch = cleaned.match(/^(mongodb(?:\+srv)?):\/\//i);
    if (protoMatch) protocol = protoMatch[1].toLowerCase();

    // Leverage URL parser safely by replacing protocol with http
    const urlObj = new URL(cleaned.replace(/^(mongodb(?:\+srv)?):\/\//i, 'http://'));
    host = urlObj.host || 'unknown';
    const pathPart = (urlObj.pathname || '').replace(/^\//, '').split('/')[0];
    if (pathPart) dbName = pathPart;
    hasUsername = Boolean(urlObj.username);
    hasPassword = Boolean(urlObj.password);

    for (const [k, v] of urlObj.searchParams.entries()) {
      queryParams.push(`${k}=${v}`);
    }

    if ((cleaned.match(/@/g) || []).length > 1) {
      multipleAtWarning = true;
    }
  } catch {
    const hostMatch = cleaned.match(/@([^/?#]+)/);
    if (hostMatch) host = hostMatch[1];
  }

  return {
    configured: true,
    protocol,
    host,
    dbName,
    hasAuth: hasUsername && hasPassword,
    hasUsername,
    hasPassword,
    multipleAtWarning,
    queryParams: queryParams.join(', ') || 'none'
  };
};

/**
 * MongoDB Atlas Connection Manager
 * Hardened for production environments (Render, cross-region latency, TLS).
 */
class Database {
  constructor() {
    this.isConnected = false;
    this.lastError = null;
  }

  /**
   * Connect to MongoDB Atlas
   */
  async connect() {
    // Resolve environment variable name with fallback
    const rawUri =
      process.env.MONGODB_URI ||
      process.env.MONGO_URI ||
      process.env.DATABASE_URL;

    if (!rawUri || !rawUri.trim()) {
      console.warn(
        '[Database] Notice: MONGODB_URI is not configured in environment variables. Running in unconfigured database mode.'
      );
      this.isConnected = false;
      return false;
    }

    // Strip leading/trailing quotes that may be accidentally introduced in environment dashboards
    const uri = rawUri.trim().replace(/^["']|["']$/g, '');

    // Safe diagnostic inspection (zero credentials exposed)
    const diag = getSafeConnectionDiagnostics(uri);
    const timeoutMs = parseInt(process.env.MONGODB_TIMEOUT_MS || '15000', 10);
    const targetDbName = process.env.MONGODB_DB_NAME || (diag.dbName !== 'default (unspecified)' ? diag.dbName : 'nextgen_mobile');

    console.log('[Database] Initializing connection with diagnostic profile:');
    console.log(`  • Protocol:       ${diag.protocol}`);
    console.log(`  • Host:           ${diag.host}`);
    console.log(`  • Target DB:      ${targetDbName}`);
    console.log(`  • Auth detected:  ${diag.hasAuth ? 'Yes (username & password present)' : 'Incomplete auth credentials'}`);
    console.log(`  • Query Params:   ${diag.queryParams}`);
    console.log(`  • Node / OpenSSL: ${process.version} / OpenSSL ${process.versions.openssl}`);
    console.log(`  • Timeout setting:${timeoutMs} ms (cross-region tolerance)`);

    if (diag.multipleAtWarning) {
      console.warn(
        '  ⚠️ WARNING: Multiple "@" characters detected in connection string. If your password contains "@", ensure it is URL-encoded as "%40".'
      );
    }

    try {
      mongoose.set('strictQuery', true);

      // Event listeners for connection monitoring
      mongoose.connection.on('connected', () => {
        this.isConnected = true;
        this.lastError = null;
        console.log('[Database] Mongoose event: connected to MongoDB Atlas');
      });

      mongoose.connection.on('error', (err) => {
        this.isConnected = false;
        this.lastError = err.message;
        console.error('[Database] Mongoose connection error event:', err.message);

        // Detect TLS Alert 80 and log actionable diagnostics
        if (err.message && (err.message.includes('alert number 80') || err.message.includes('tlsv1 alert internal error'))) {
          console.error('========================================================================');
          console.error('🚨 [Database Diagnostic] TLS Alert 80 (Internal Error) Detected:');
          console.error('   MongoDB Atlas abruptly closed the TLS handshake.');
          console.error('   PRIMARY CAUSE: Your connecting host (Render outbound IP) is NOT');
          console.error('   allowed in the MongoDB Atlas Network Access IP Access List.');
          console.error('   ACTION REQUIRED: In MongoDB Atlas -> Network Access:');
          console.error('   Add Render outbound CIDRs as separate entries or allow 0.0.0.0/0.');
          console.error('========================================================================');
        }
      });

      mongoose.connection.on('disconnected', () => {
        this.isConnected = false;
        console.warn('[Database] Mongoose event: disconnected from MongoDB');
      });

      // Mongoose Connection Options configured for cross-region stability and valid TLS
      const conn = await mongoose.connect(uri, {
        dbName: targetDbName,
        serverSelectionTimeoutMS: timeoutMs,
        connectTimeoutMS: 15000,
        socketTimeoutMS: 45000,
        maxPoolSize: 10,
        minPoolSize: 1,
        family: 4 // IPv4 preference to avoid DNS delay in container environments
      });

      this.isConnected = true;
      this.lastError = null;
      console.log(`[Database] MongoDB Atlas Connected: ${conn.connection.host} (Database: ${conn.connection.name})`);
      return true;
    } catch (error) {
      this.isConnected = false;
      this.lastError = error.message;

      console.error(`[Database] MongoDB Atlas Connection Failure: ${error.message}`);

      // Actionable diagnostic notice on catch
      if (error.message && (error.message.includes('alert number 80') || error.message.includes('tlsv1 alert internal error'))) {
        console.error('========================================================================');
        console.error('🚨 [Database Diagnostic] TLS Alert 80 Handshake Failure:');
        console.error('   Atlas rejected the TLS connection because the client IP is blocked.');
        console.error('   Ensure Render outbound IPs (74.220.48.0/24 & 74.220.56.0/24) are');
        console.error('   added as separate entries, or allow 0.0.0.0/0 in Atlas Network Access.');
        console.error('========================================================================');
      }

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
    const hasConfig = Boolean(
      process.env.MONGODB_URI || process.env.MONGO_URI || process.env.DATABASE_URL
    );

    return {
      status: !hasConfig ? 'unconfigured' : states[readyState] || 'unknown',
      connected: readyState === 1,
      host: mongoose.connection.host || null,
      name: mongoose.connection.name || null,
      lastError: this.lastError
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
