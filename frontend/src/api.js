import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const login = (username, password) => API.post('/login', { username, password });
export const getResolutions = (userId) => API.get(`/resolutions?userId=${userId}`);
export const createResolution = (userId, goal) => API.post('/resolutions', { userId, goal });
export const saveResolutionPlan = (userId, resolutionId, plan) => API.post('/resolution-plan', { userId, resolutionId, plan });

export default API;