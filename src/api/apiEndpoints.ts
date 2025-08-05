import { API_BASE_URL } from "./apiConfig";

export const API_ENDPOINTS = {
    FRUITS: {
        api: `${API_BASE_URL}/fruits`
    },
    CATEGORIES: {
        api: `${API_BASE_URL}/category`
    },
    USER: {
        api: `${API_BASE_URL}/api/auth`,
        authUser : `${API_BASE_URL}/api/user`,
        user: `${API_BASE_URL}/api/user`
    },
    CART:{
        api: `${API_BASE_URL}/api/cart`
    },
    COUPON :{
        api: `${API_BASE_URL}/api/coupon`
    },

};