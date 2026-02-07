// API configuration for ProcureWatch
// Update this URL to point to your FastAPI backend
export const API_BASE_URL = "https://web-production-4d5c0.up.railway.app";

export const API_ENDPOINTS = {
  noticesSearch: `${API_BASE_URL}/api/notices/search`,
} as const;
