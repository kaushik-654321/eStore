import axios from 'axios';
import { API_BASE_URL } from './apiConfig';


const axiosInstance = axios.create({
    baseURL: API_BASE_URL
})

const userSession = sessionStorage.getItem('user');
const { token } = userSession && JSON.parse(userSession);
// Add interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
)

export default axiosInstance;