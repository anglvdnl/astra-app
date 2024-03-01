"use client"

import axios from 'axios';
import {deleteCookie, getCookies} from "cookies-next";

const axiosInstance = axios.create({
    baseURL: process.env.API_URL,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const cookies = getCookies()
        const token = cookies?.auth

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Handle unauthorized errors
        console.log(error);
        if (error.response.status === 401) {
            window.location.href = "/auth"
            deleteCookie("auth")
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;