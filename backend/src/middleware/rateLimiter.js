import rateLimit from 'express-rate-limit';

/**
 * Rate Limiter for Customer Pre-Order Submissions
 * Prevents spamming, automated bots, and database exhaustion.
 * Window: 15 minutes | Max requests: 15 per IP
 */
export const preOrderLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 15, // Limit each IP to 15 pre-order submissions per window
  standardHeaders: true, // Return standard RateLimit-* headers (RFC draft-6/7)
  legacyHeaders: false, // Disable X-RateLimit-* legacy headers
  message: {
    success: false,
    error: {
      message: 'Too many pre-order requests from this IP address. Please try again after 15 minutes.',
      status: 429
    },
    timestamp: new Date().toISOString()
  }
});

export default {
  preOrderLimiter
};

