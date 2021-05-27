import axios from 'lib/Axios.js';

export const storeTransaction = async (payload) => {
    return axios.post(`/api/v1/transaction`, payload);
};

export const fetchUserTransactions = async () => {
    return axios.get(`/api/v1/transaction`);
};

export const fetchTransactions = async ({ transactionId }) => {
    return axios.get(`/api/v1/transaction/${transactionId}`);
};

export const deleteTransaction = async ({ transactionId }) => {
    return axios.delete(`/api/v1/transaction/${transactionId}`);
};
