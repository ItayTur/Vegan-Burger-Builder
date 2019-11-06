import * as actionTypes from './actionTypes';
import axios from 'axios';

const authSuccess = responseData => ({
    type: actionTypes.AUTH_SUCCESS,
    data: responseData
})

const authFail = error => ({
    type: actionTypes.AUTH_FAIL,
    error: error
})

const onAuthStart = () => ({
    type: actionTypes.START_AUTH
});

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
                console.log(response);
                dispatch(authSuccess(response.data));
            }).catch(error => {
                console.log(error);
                dispatch(authFail(error));
            })
    }
}