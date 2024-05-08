"use server"

import axios from 'axios';
import {cookies} from "next/headers";
import * as https from "https";
import {redirect} from "next/navigation";

const axiosInstanceServer = axios.create({
    httpsAgent: new https.Agent({
        rejectUnauthorized: false
    }),
    baseURL: process.env.API_URL,
});

axiosInstanceServer.interceptors.request.use(
    (config) => {
        const cookie = cookies().get("auth")

        if (cookie && cookie.value) {
            config.headers.Authorization = `Bearer ${cookie.value}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstanceServer.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.log(error);
        if (error.response.status === 401) {
            redirect("/auth")
        }

        return Promise.reject(error);
    }
);

export default axiosInstanceServer;