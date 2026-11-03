/**
 * 404 Route Not Found Middleware
 */
export const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    success: false,
    error: {
      message: `Resource not found: ${req.method} ${req.originalUrl}`,
      status: 404
    },
    timestamp: new Date().toISOString()
  });
};

export default notFoundHandler;

