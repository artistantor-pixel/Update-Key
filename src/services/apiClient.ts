import axios from 'axios';

// Create a modular Axios client for NestJS backend integration
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Example service methods ready for backend
export const apiServices = {
  // Submit lead from contact & audit forms
  submitLead: async (data: { email: string; source: string }) => {
    return apiClient.post('/leads', data);
  },
  
  // Submit dynamic project scope calculation
  submitEstimate: async (data: { services: string[]; estimatedMin: number; estimatedMax: number }) => {
    return apiClient.post('/estimates', data);
  },
  
  // Optional dynamic fetching for case studies
  getCaseStudies: async () => {
    return apiClient.get('/case-studies');
  }
};
