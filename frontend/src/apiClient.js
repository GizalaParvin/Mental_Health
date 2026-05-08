export const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const apiClient = async (endpoint, { body, ...customConfig } = {}) => {
  const token = localStorage.getItem('token');
  const headers = { 'Content-Type': 'application/json' };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const config = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, config);
  const data = await response.json().catch(() => ({}));

  if (response.ok) {
    return data;
  } else {
    return Promise.reject(data);
  }
};
