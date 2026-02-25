import axios from "axios";
import { API_URL } from "./constants/url";
import { message } from "antd";

export const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const status = error.response ? error.response.status : null;

        if (status === 401) {
            sessionStorage.removeItem("token");

            message.error("A munkamenet lejárt, kérjük jelentkezzen be újra!");

            window.location.href = "/login";
        }

        return Promise.reject(error);
    }
);