import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:80/capstone-project/jobsync/src/api',
});

export default apiClient;
