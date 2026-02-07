// API configuration for ProcureWatch
// Update this URL to point to your FastAPI backend
export const API_BASE_URL = "https://YOUR_FASTAPI_URL";

export const API_ENDPOINTS = {
  noticesSearch: `${API_BASE_URL}/api/notices/search`,
} as const;
