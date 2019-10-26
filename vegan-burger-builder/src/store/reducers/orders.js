import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    orders: [],
    loading: false,
    isOrderSuccess: false
}

const orderInit = (state, action) => {
    return updateObject(state, { isOrderSuccess: false })
}

const startOrder = (state, action) => {
    return updateObject(state, { loading: true })
}

const onOrderSuccess = (state, action) => {
    const newOrder = {
        id: action.id,
        data: action.orderData
    }

    const newOrders = state.orders.concat(newOrder);
    return updateObject(
        state, {
        loading: false,
        orders: newOrders,
        isOrderSuccess: true
    })
}

const startFetchOrders = (state, action) => {
    return updateObject(state, { loading: true });
}

const fetchOrdersSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        orders: action.orders
    })
}

const fetchOrderdFails = (state, action) => {
    return updateObject(state, {
        loading: false,
        isOrderSuccess: false
    })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ORDER_INIT: return orderInit(state, action);
        case actionTypes.START_ORDER: return startOrder(state, action);
        case actionTypes.ON_ORDER_SUCCESS: return onOrderSuccess(state, action);
        case actionTypes.START_FETCH_ORDERS: return startFetchOrders(state, action);
        case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrdersSuccess(state, action);
        case actionTypes.FETCH_ORDERS_FAIL: return fetchOrderdFails(state, action);
        default: return state;
    }
}

export default reducer;