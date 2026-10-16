import api from './api';

export const aiService = {
  askGemini: (prompt) => api.post('/ai/advice', { prompt }),
  getRoadmap: (targetRole) => api.post('/ai/roadmap', { targetRole }),
  reviewProject: (projectData) => api.post('/ai/review-project', projectData),

  // Resume Upload & ATS Parser with Gemini
  parseResume: (payload) => {
    if (payload instanceof FormData) {
      return api.post('/ai/parse-resume', payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    }
    return api.post('/ai/parse-resume', payload);
  },

  // Auto-populate roadmap milestones from ATS output
  populateRoadmap: (data) => api.post('/ai/populate-roadmap', data),

  // Auto-populate skills & identified skill gaps from ATS output
  populateSkills: (data) => api.post('/ai/populate-skills', data),
};

export default aiService;
