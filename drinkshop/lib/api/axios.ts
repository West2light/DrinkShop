import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_ENDPOINT;

// Create public axios instance (no auth required)
export const publicApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Create private axios instance (auth required)
export const privateApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Enable sending cookies
});

// Add request interceptor to private instance to handle auth
privateApi.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Get session from cookie
    const session = document.cookie
      .split("; ")
      .find((row) => row.startsWith("user_session="));

    if (session) {
      const sessionData = JSON.parse(session.split("=")[1]);
      // Add user info to request headers
      config.headers["X-User-Id"] = sessionData.id;
      config.headers["X-User-Role"] = sessionData.role;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to both instances
const responseInterceptor = (response: AxiosResponse) => {
  // Return the actual data from the response
  return response.data;
};

const errorInterceptor = (error: AxiosError) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.error("Response Error:", error.response.data);
    return Promise.reject(error.response.data);
  } else if (error.request) {
    // The request was made but no response was received
    console.error("Request Error:", error.request);
    return Promise.reject({ message: "No response from server" });
  } else {
    // Something happened in setting up the request that triggered an Error
    console.error("Error:", error.message);
    return Promise.reject({ message: "Request failed" });
  }
};

publicApi.interceptors.response.use(responseInterceptor, errorInterceptor);
privateApi.interceptors.response.use(responseInterceptor, errorInterceptor);

// Add response interceptor to private instance to handle auth errors
privateApi.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Redirect to login page if unauthorized
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
