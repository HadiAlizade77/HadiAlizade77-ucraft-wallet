import * as http from '@/http/TransactionServices';
export const SET_USER_TRANSACTIONS = 'SET_USER_TRANSACTIONS';

export const fetchUserTransactions = () => {
    return (dispatch) => {
        return http
            .fetchUserTransactions()
            .then(({ data }) => {
                dispatch(setUserTransactions(data.data));
                return data;
            })
            .catch((err) => {
                throw err;
            });
    };
};
export const setUserTransactions = (data) => {
    return {
        type: SET_USER_TRANSACTIONS,
        payload: data
    };
};
