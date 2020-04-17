import { put } from 'redux-saga/effects';
import axios from '../../axios-orders';
import * as actions from '../actions';

export function* startOrderSaga(action) {
    try {
        yield put(actions.onStartOrder());
        const response = yield axios.post('/orders.json?auth=' + action.token, action.order);
        yield put(actions.onOrderSuccess(response.data.name, action.order));
    } catch (error) {
        yield put(actions.onOrderFail(error));
    }
}

export function* fetchOrderSaga(action) {
    try {
        yield put(actions.onStartFetchOrders());
        const queryParams = '?auth=' + action.token + '&orderBy="userId"&equalTo="' + action.userId + '"';
        const response = yield axios.get('/orders.json' + queryParams);
        let fetchedOrders = [];
        for (let key in response.data) {
            fetchedOrders.push({ ...response.data[key], id: key })
        };
        yield put(actions.fetchOrdersSuccess(fetchedOrders));
        
    } catch (error) {
        yield put(actions.fetchOrdersFail());
    }
}