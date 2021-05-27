import axios from 'lib/Axios.js';

export const storeWallet = async (payload) => {
    return axios.post(`/api/v1/wallet`, payload);
};

export const fetchUserWallets = () => {
    return axios.get('/api/v1/wallet');
};

export const fetchWalletInfo = ({ walletId }) => {
    return axios.get(`/api/v1/wallet/${walletId}`);
};

export const fetchWalletTransactions = ({ walletId }) => {
    return axios.get(`/api/v1/wallet/transactions/${walletId}`);
};

export const deleteWallet = async ({ walletId }) => {
    return axios.delete(`/api/v1/wallet/${walletId}`);
};
