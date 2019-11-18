import { sendRequest } from '../ws/index';

export function auth(login, password) {
    var request = {
        cmd: 'auth_req',
        login,
        password
    };
    sendRequest(request);
}

export function tokenAuth(token) {
    var request = {
        cmd: 'token_auth_req',
        token
    };
    sendRequest(request);
}

export function saveToken(token) {
    localStorage.setItem('token', token);
}

export function getToken() {
    return localStorage.getItem('token');
}

export function hasToken() {
    return localStorage.getItem('token') != null;
}

export function isLogined() {
    return hasToken();
}

export function logout() {
    localStorage.clear();
    var request = {
        cmd: 'close_auth_req'
    };
    sendRequest(request);
}