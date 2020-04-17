import { put, delay } from 'redux-saga/effects';
import axios from 'axios';
import * as actions from '../actions';

export function* logoutSaga(action) {
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('userId');
    yield localStorage.removeItem('expirationTime');
    yield put(actions.logoutSucceed());
}

export function* logoutExpirationSaga(action) {
    yield delay(action.expirationTime * 1000);
    yield put(actions.onAuthLogout())
}

export function* authStartSaga({ email, password, isSignUp }) {
    const authData = {
        email,
        password,
        returnSecureToken: true
    }
    let url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC3NEUaW7UjQlTlBo-LISNiY9CohWRw9sE";
    if (isSignUp) {
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC3NEUaW7UjQlTlBo-LISNiY9CohWRw9sE';
    }
    yield put(actions.onAuthStart());
    try {
        const response = yield axios.post(url, authData);
        localStorage.setItem('token', response.data.idToken);
        localStorage.setItem('userId', response.data.localId);
        localStorage.setItem('expirationTime', new Date(new Date().getTime() + response.data.expiresIn * 1000))
        yield put(actions.authSuccess(response.data.idToken, response.data.localId));
        yield put(actions.authLogout(response.data.expiresIn));
    } catch (error) {
        yield put(actions.authFail(error.response.data.error));
    }
}

export function* checkExpirationSaga(action) {
    const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        if (!token) {
            yield put(actions.onAuthLogout())
        } else {
            const expirationTime = new Date(localStorage.getItem('expirationTime'));
            if (expirationTime >= new Date()) {
                yield put(actions.authSuccess(token, userId));
                yield put(actions.authLogout((expirationTime.getTime() - new Date().getTime()) / 1000));
            }
        }
}