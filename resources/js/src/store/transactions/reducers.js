import { SET_USER_TRANSACTIONS } from './actions';

const initialState = {
    transactions: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_USER_TRANSACTIONS: {
            return { ...state, transactions: action.payload };
        }
        default:
            return state;
    }
}
