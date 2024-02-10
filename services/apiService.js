import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000', 
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(config => {
    config.headers['Access-Control-Allow-Origin'] = '*';
    return config;
  });

export default {
  login(credentials) {
    return apiClient.post('/login', credentials);
  },
};
