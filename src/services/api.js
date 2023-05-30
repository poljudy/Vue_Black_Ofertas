import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.escuelajs.co/api/v1'
});

export default api;