/**
 * Centralized Error Handling Middleware
 */
export const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || err.status || 500;
  
  if (err.message && err.message.includes('CORS Policy')) {
    statusCode = 403;
  }

  const isDev = process.env.NODE_ENV === 'development';

  console.error(`[Error] [${req.method}] ${req.originalUrl}:`, err.message);

  if (isDev && err.stack) {
    console.error(err.stack);
  }

  res.status(statusCode).json({
    success: false,
    error: {
      message: err.message || 'Internal Server Error',
      status: statusCode,
      ...(isDev && { stack: err.stack })
    },
    timestamp: new Date().toISOString()
  });
};

export default errorHandler;
