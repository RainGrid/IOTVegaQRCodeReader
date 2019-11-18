import {
    LOGIN_USER,
    LOGIN_USER_FAILED,
    LOGIN_USER_SUCCESS,
    LOGOUT_USER
} from '../actions/userActions';

const initialState = {
    token: null,
    logined: false,
    fetching: false,
    wasChecked: false,
    loginError: false
}

export function userReducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN_USER:
            return { ...state, fetching: true, loginError: null };
        case LOGIN_USER_FAILED:
            return { ...state, fetching: false, loginError: action.payload, logined: false, wasChecked: true };
        case LOGIN_USER_SUCCESS:
            return { ...state, token: action.payload, logined: true, fetching: false, wasChecked: true };
        case LOGOUT_USER:
            return { ...initialState, wasChecked: true };
        default:
            return state;
    }
}