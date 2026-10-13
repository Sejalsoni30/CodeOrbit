import api from './api';

export const goalService = {
  getAll: () => api.get('/goals'),
  create: (data) => api.post('/goals', data),
  toggle: (id) => api.patch(`/goals/${id}/toggle`),
  delete: (id) => api.delete(`/goals/${id}`),
};

export default goalService;
