import axios from 'axios';
import { API_BASE_URL } from './apiConfig';
import { store } from '../app/store';


const axiosInstance = axios.create({
    baseURL: API_BASE_URL
})


// Add interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const state = store.getState();
        const token = state.user?.token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
)

export default axiosInstance;