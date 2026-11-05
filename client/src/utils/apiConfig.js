/**
 * API Configuration
 * Supports VITE_API_BASE_URL for production deployments (https://phone-pre-order-1.onrender.com).
 * In local development, defaults to an empty string so relative paths (/api/*) are proxied by Vite dev server.
 */

// Production Render backend URL
const PRODUCTION_BACKEND_URL = 'https://phone-pre-order-1.onrender.com';

// Read from Vite environment variable with trailing slash trimmed
const envApiUrl = (import.meta.env.VITE_API_BASE_URL || '').trim().replace(/\/+$/, '');

// In production, use configured VITE_API_BASE_URL or fallback to known Render backend URL
export const API_BASE_URL = envApiUrl || (import.meta.env.PROD ? PRODUCTION_BACKEND_URL : '');

/**
 * Returns the fully-qualified API URL for an endpoint
 * @param {string} endpoint - e.g. '/api/preorders' or '/api/health'
 * @returns {string} - Fully-qualified URL in production or relative path in dev
 */
export const getApiUrl = (endpoint) => {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${API_BASE_URL}${cleanEndpoint}`;
};

export default {
  API_BASE_URL,
  getApiUrl
};
