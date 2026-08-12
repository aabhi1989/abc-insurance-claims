// API Service
// TODO: Implement Axios/HTTP client for API communication

import axios from 'axios'

const apiClient = axios.create({
  baseURL: process.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// TODO: Add request/response interceptors for:
// - Authentication token injection
// - Error handling
// - Request logging
// - Response transformation

export default apiClient
