/**
 * API Configuration
 * Supports VITE_API_BASE_URL for production deployments (e.g. https://your-backend.onrender.com).
 * In local development, defaults to an empty string so relative paths (/api/*) are proxied by Vite.
 */
export const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').trim().replace(/\/+$/, '');

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

