import axios from 'axios';

const api = axios.create({
  baseURL: 'https://dummyjson.com'
});

export default api;