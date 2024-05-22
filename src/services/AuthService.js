import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://dummyjson.com/auth/',
    headers: {
        'Content-Type': 'application/json',
    },
});