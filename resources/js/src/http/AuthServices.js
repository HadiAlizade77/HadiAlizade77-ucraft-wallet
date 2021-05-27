import axios from 'lib/Axios.js';

export const loginWithOAuthCallback = async ({ provider, payload }) => {
    return axios.get(`/api/auth/${provider}/callback`, {
        params: payload
    });
};
export const loginWithCredentials = async ({ email, password }) => {
    return axios.post(`/api/login`, { email, password });
};
export const registerWithCredentials = async ({ email, name, password }) => {
    return axios.post(`/api/register`, { email, name, password });
};
export const verifyEmail = async (payload) => {
    return axios.post(`/api/verify-email`, payload);
};

export const fetchAuthData = () => {
    return axios.get('/api/user');
};
