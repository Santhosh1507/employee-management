import axios from 'axios';

const api = axios.create({
  baseURL: 'https://employee-management-hxen.onrender.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
