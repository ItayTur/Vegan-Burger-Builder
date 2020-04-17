import * as actionTypes from './actionTypes';

export const authSuccess = (token, userId) => ({
    type: actionTypes.AUTH_SUCCESS,
    token,
    userId
})

export const authFail = error => ({
    type: actionTypes.AUTH_FAIL,
    error: error
})

export const onAuthStart = () => ({
    type: actionTypes.START_AUTH
});

export const onAuthLogout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT_INIT
    }
};

export const logoutSucceed = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const authLogout = expirationTime => {
    return {
        type: actionTypes.START_EXPIRATION_TIMER,
        expirationTime
    }
};

export const authStart = (email, password, isSignUp) => {
    return {
        type: actionTypes.AUTH_USER,
        email,
        password,
        isSignUp
    }
}

export const authRedirectPath = path => ({
    type: actionTypes.AUTH_REDIRECT_PATH,
    path
})

export const checkAuthExpiration = () => {
    return {
        type: actionTypes.CHECK_AUTH_EXPIRATION
    }
}