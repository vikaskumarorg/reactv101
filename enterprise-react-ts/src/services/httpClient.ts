import axios from 'axios';

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 30_000,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

httpClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    // Central place to normalize API errors, handle 401/session expiry,
    // and report unexpected failures to your monitoring service.
    return Promise.reject(error);
  },
);
