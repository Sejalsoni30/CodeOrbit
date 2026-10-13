import api from './api';

export const aiService = {
  askGemini: (prompt) => api.post('/ai/advice', { prompt }),
  getRoadmap: (targetRole) => api.post('/ai/roadmap', { targetRole }),
  reviewProject: (projectData) => api.post('/ai/review-project', projectData),
};

export default aiService;
