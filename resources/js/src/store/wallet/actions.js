import * as http from '@/http/WalletServices';
export const SET_AUTH_USER_DATA = 'SET_AUTH_USER_DATA';
export const SET_USER_WAlLETS = 'SET_USER_WAlLETS';
export const SET_WAlLET_TRANSACTIONS = 'SET_WAlLET_TRANSACTIONS';

export const fetchUserWallets = () => {
    return (dispatch) => {
        return http
            .fetchUserWallets()
            .then(({ data }) => {
                dispatch(setUserWallets(data.data));
                return data;
            })
            .catch((err) => {
                throw err;
            });
    };
};
export const setUserWallets = (data) => {
    return {
        type: SET_USER_WAlLETS,
        payload: data
    };
};

export const fetchWalletTransactions = ({ walletId }) => {
    return (dispatch) => {
        return http
            .fetchWalletTransactions({ walletId })
            .then(({ data }) => {
                dispatch(setWalletTransactions({ data: data.data, walletId }));
                return data;
            })
            .catch((err) => {
                throw err;
            });
    };
};
export const setWalletTransactions = ({ data, walletId }) => {
    return {
        type: SET_WAlLET_TRANSACTIONS,
        payload: { data, walletId }
    };
};
