import { takeEvery } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';
import { logoutSaga, logoutExpirationSaga, authStartSaga, checkExpirationSaga } from './auth';
import { fetchingIngridentsSaga } from './burgerBuilder';
import { startOrderSaga, fetchOrderSaga } from './orders';

export function* watchAuth() {
    yield takeEvery(actionTypes.START_EXPIRATION_TIMER, logoutExpirationSaga);
    yield takeEvery(actionTypes.AUTH_LOGOUT_INIT, logoutSaga);
    yield takeEvery(actionTypes.AUTH_USER, authStartSaga);
    yield takeEvery(actionTypes.CHECK_AUTH_EXPIRATION, checkExpirationSaga);
}

export function* watchBurgerBuilder() {
    yield takeEvery(actionTypes.START_FETCHING_INGREDIENTS, fetchingIngridentsSaga);
}

export function* watchOrders() {
    yield takeEvery(actionTypes.START_ORDER_SAGA, startOrderSaga);
    yield takeEvery(actionTypes.FETCH_ORDER_SAGA, fetchOrderSaga)
}