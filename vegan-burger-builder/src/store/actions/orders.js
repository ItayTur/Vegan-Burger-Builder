import * as actionTypes from './actionTypes';

export const orderInit = () => {
    return {
        type: actionTypes.ORDER_INIT
    }
}

export const onStartOrder = () => {
    return {
        type: actionTypes.START_ORDER
    }
}

export const startOrder = (order, token) => {
    return {
        type: actionTypes.START_ORDER_SAGA,
        order,
        token
    }
}

export const onOrderSuccess = (id, orderData) => {
    return {
        type: actionTypes.ON_ORDER_SUCCESS,
        id,
        orderData
    }
}

export const onOrderFail = (error) => {
    return {
        type: actionTypes.ON_ORDER_FAIL,
        error
    }
}

export const onStartFetchOrders = () => {
    return {
        type: actionTypes.START_FETCH_ORDERS
    }
}

export const startFetchOrders = (token, userId) => {
    return {
        type: actionTypes.FETCH_ORDER_SAGA,
        token,
        userId
    }
}

export const fetchOrdersSuccess = fetchedOrders => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: fetchedOrders
    }
}

export const fetchOrdersFail = error => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error
    }
}