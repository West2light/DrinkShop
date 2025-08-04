export const API_BASE_URL = process.env.NEXT_PUBLIC_API_ENDPOINT;

export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: `${API_BASE_URL}/users`,
    LOGIN: `${API_BASE_URL}/users`,
    LOGOUT: `${API_BASE_URL}/logout`,
  },
};
