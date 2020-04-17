import { takeEvery } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';
import { logoutSaga, logoutExpirationSaga, authStartSaga, checkExpirationSaga } from './auth';

export function* watchAuth(action) {
    yield takeEvery(actionTypes.START_EXPIRATION_TIMER, logoutExpirationSaga);
    yield takeEvery(actionTypes.AUTH_LOGOUT_INIT, logoutSaga);
    yield takeEvery(actionTypes.AUTH_USER, authStartSaga);
    yield takeEvery(actionTypes.CHECK_AUTH_EXPIRATION, checkExpirationSaga);
}