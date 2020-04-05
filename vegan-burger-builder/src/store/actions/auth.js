import * as actionTypes from './actionTypes';
import axios from 'axios';

const authSuccess = (token, userId) => ({
    type: actionTypes.AUTH_SUCCESS,
    token,
    userId
})

const authFail = error => ({
    type: actionTypes.AUTH_FAIL,
    error: error
})

const onAuthStart = () => ({
    type: actionTypes.START_AUTH
});

export const onAuthLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expirationTime');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
};

const authLogout = expertionTime => {
    return dispatch => {
        setTimeout(
            () => {
                dispatch(onAuthLogout())
            }
            , expertionTime * 1000)
    }
};

export const authStart = (email, password, isSignUp) => {
    return dispatch => {
        const authData = {
            email,
            password,
            returnSecureToken: true
        }
        let url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC3NEUaW7UjQlTlBo-LISNiY9CohWRw9sE";
        if (isSignUp) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC3NEUaW7UjQlTlBo-LISNiY9CohWRw9sE';
        }
        dispatch(onAuthStart());
        axios.post(url, authData)
            .then(response => {
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('userId', response.data.localId);
                localStorage.setItem('expirationTime', new Date(new Date().getTime() + response.data.expiresIn * 1000))
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(authLogout(response.data.expiresIn));
            }).catch(error => {
                dispatch(authFail(error.response.data.error));
            })
    }
}

export const authRedirectPath = path => ({
    type: actionTypes.AUTH_REDIRECT_PATH,
    path
})

export const checkAuthExpiration = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        if (!token) {
            dispatch(onAuthLogout())
        } else {
            const expirationTime = new Date(localStorage.getItem('expirationTime'));
            if (expirationTime >= new Date()) {
                dispatch(authSuccess(token, userId));
                dispatch(authLogout((expirationTime.getTime() - new Date().getTime())/1000));
            }
        }
    }
}