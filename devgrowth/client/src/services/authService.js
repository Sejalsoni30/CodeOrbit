import api from './api';

export const authService = {
  syncUser: (userData) => api.post('/auth/sync', userData),
  getProfile: () => api.get('/auth/profile'),
  logout: () => api.post('/auth/logout'),
};

export default authService;
