import axios from 'axios';

const axiosBase = axios.create({
  baseURL: 'http://localhost:5555/api',
});

export default axiosBase;