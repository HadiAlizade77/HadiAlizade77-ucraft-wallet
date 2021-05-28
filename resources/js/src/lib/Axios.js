// axios
import axios from 'axios';

const apiBaseURL = process.env.API_BASE_URL || process.env.APP_URL; // GET API'S BASE URL FROM .ENV

const createdAxios = axios.create({
    baseURL: apiBaseURL,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
});

//request interceptor

createdAxios.interceptors.request.use(
    function (config) {
        const token = window.localStorage.getItem('token');
        if (token != null) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error.response);
    }
);

//response interceptor
createdAxios.interceptors.response.use(
    (response) => {
        return response;
    },
    function (error) {
        if (error.response.status === 401) {
            localStorage.removeItem('token');
            location.reload();
        }
        if (error.response.status === 403) {
            window.location.href = '/auth/unverified';
        }
        return Promise.reject(error.response);
    }
);

export default createdAxios;
