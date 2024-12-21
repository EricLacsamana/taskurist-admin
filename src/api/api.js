import axios from 'axios';
import { store } from '../store';
import { setAccessToken, setRefreshToken, logoutSuccess } from '../store/authSlice';
import { thenCallbackRQ } from '../utils/helpers';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const getAccessToken = () => {
  const state = store.getState();
  return state.auth.accessToken;
};

const getRefreshToken = () => {
  const state = store.getState();
  return state.auth.refreshToken;
};

api.interceptors.request.use((config) => {
  const accessToken = getAccessToken();

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401) {
      const refreshToken = getRefreshToken();

      if (refreshToken) {
        try {
          const response = await api.post('/auth/refresh', { refreshToken });
          const { accessToken, refreshToken: newRefreshToken } = response.data;

          store.dispatch(setAccessToken(accessToken));
          store.dispatch(setRefreshToken(newRefreshToken));

          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return api(originalRequest);
        } catch (refreshError) {
          console.error('Failed to refresh token:', refreshError);
          store.dispatch(logoutSuccess());
          return Promise.reject(refreshError);
        }
      }
    }

    return Promise.reject(error);
  }
);

export const createUser = async (data) => {
  const response = await api.post('/auth/register', data);
  return response.data;
};

export const loginUserApi = async (payload) => {
  const response = await api.post('/auth/login', payload);
  const { accessToken, refreshToken, user } = response.data;

  store.dispatch(setAccessToken(accessToken));
  // store.dispatch(setRefreshToken(refreshToken));

  return { user, accessToken, refreshToken };
};

// eslint-disable-next-line no-unused-vars
export const logoutUserApi = async (refreshToken) => {
  try {
    // await api.post('/auth/logout', { refreshToken });
    store.dispatch(logoutSuccess());
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  } catch (error) {
    console.error('Failed to logout:', error);
  }
};

export const createJobOrder = async (payload) => {
  console.log('payload', payload);
  const response = await api.post('/job-orders', payload);
  return response.data;
};

export const retrieveJobOrders = async () => {
  return  api.get('/job-orders').then(thenCallbackRQ);
};

export const updateJobOrder = async (payload) => {
  const response = await api.put(`/job-orders/${payload.id}`, payload);
  return response.data;
};

export const updateToggleCompleteJobOrder = async (id) => {
  const response = await api.put(`/job-orders/${id}/complete`);
  return response.data;
};

export const deleteJobOrder = async (id) => {
  await api.delete(`/job-orders/${id}`);
};


export const register = async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to add item');
    }
  };

export const login = async (credentials) => {
    const { email, password } = credentials;
    try {
        const response = await api.post('/auth/login', { email, password });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Login failed');
    }
};

export const getUserProfile = async () => {
  try {
    const response = await api.get('/users/me');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch profile');
  }
};

export const retrieveUsers = async () => {
  try {
    const response = await api.get('/users');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch users');
  }
};

export const addUser = async (userData) => {
  try {
    const response = await api.post('/users', userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to add item');
  }
};


export const deleteUser = async (id) => {
  try {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to delete item');
  }
};
