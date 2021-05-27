import { SET_USER_WAlLETS, SET_WAlLET_TRANSACTIONS } from './actions';

const initialState = {
    wallets: [],
    walletTransactions: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_USER_WAlLETS: {
            return { ...state, wallets: action.payload };
        }
        case SET_WAlLET_TRANSACTIONS: {
            console.log(action, action.payload.data);
            return {
                ...state,
                walletTransactions: {
                    ...state.walletTransactions,
                    [`${action.payload.walletId}`]: action.payload.data
                }
            };
        }
        default:
            return state;
    }
}
