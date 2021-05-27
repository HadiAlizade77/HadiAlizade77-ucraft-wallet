import { SET_AUTH_USER_DATA } from './actions';

const initialState = {
    isAuthenticated: false,
    authUser: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_AUTH_USER_DATA: {
            return {
                isAuthenticated: true,
                authUser: action.payload
            };
        }
        default:
            return state;
    }
}
