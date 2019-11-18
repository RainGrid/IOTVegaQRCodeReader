import * as userApi from '../api/userApi';

export const LOGIN_USER = 'LOGIN_USER';
export const LOGIN_USER_FAILED = 'LOGIN_USER_FAILED';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';

export const LOGOUT_USER = 'LOGOUT_USER';

export function loginUser(login, password) {
    return function (dispatch) {
        dispatch({
            type: LOGIN_USER
        })
        userApi.auth(login, password);
    }
}

export function loginUserSuccess(token) {
    return function (dispatch) {
        dispatch({
            type: LOGIN_USER_SUCCESS,
            payload: token
        })
        userApi.saveToken(token);
    }
}

export function loginUserFailed(error) {
    return function (dispatch) {
        dispatch({
            type: LOGIN_USER_FAILED,
            payload: error
        })
        userApi.logout();
    }
}

export function logoutUser() {
    return {
        type: LOGOUT_USER
    }
}

export function logoutUserFull() {
    userApi.logout();
    return {
        type: LOGOUT_USER
    }
}

export function checkUser() {
    return function (dispatch) {
        let token = userApi.getToken();
        if (token) {
            dispatch({
                type: LOGIN_USER
            })
            userApi.tokenAuth(token);
        } else {
            dispatch({
                type: LOGIN_USER_FAILED
            });
        }
    }
}
