// api/axios.js
import axios from 'axios';

const Axios = axios.create({
  baseURL: 'https://med-manager-backend.onrender.com/api',
});

export default Axios;
