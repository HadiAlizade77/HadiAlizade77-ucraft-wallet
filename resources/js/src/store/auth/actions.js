import * as http from '@/http/AuthServices';
export const SET_AUTH_USER_DATA = 'SET_AUTH_USER_DATA';

export const fetchAuthData = () => {
    return (dispatch) => {
        return http
            .fetchAuthData()
            .then(({ data }) => {
                dispatch(setAuthUserData(data));
                return data;
            })
            .catch((err) => {
                throw err;
            });
    };
};
export const setAuthUserData = (data) => {
    return {
        type: SET_AUTH_USER_DATA,
        payload: data
    };
};
