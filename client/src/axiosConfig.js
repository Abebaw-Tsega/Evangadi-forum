import axios from 'axios';

const axiosBase = axios.create({
  // baseURL: 'http://localhost:5555/api',
  baseURL: 'https://evangadi-forum-backend-deploy-2-hc59.onrender.com/',
});

export default axiosBase;