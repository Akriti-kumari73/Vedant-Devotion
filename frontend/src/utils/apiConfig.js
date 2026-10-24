// Base API URL configuration
// If VITE_API_URL is provided in Vercel / .env, uses that; otherwise uses relative /api
export const API_BASE = import.meta.env.VITE_API_URL || '';
