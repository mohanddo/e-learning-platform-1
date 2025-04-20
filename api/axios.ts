import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
export const axiosInstance = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
        //   const parsedUser = JSON.parse(savedUser);
        //   config.headers.Authorization = `Bearer ${parsedUser.jwtToken}`;
        //   config.withCredentials = true;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);