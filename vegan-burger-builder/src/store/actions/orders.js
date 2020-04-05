import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const orderInit = () => {
    return {
        type: actionTypes.ORDER_INIT
    }
}

const onStartOrder = () => {
    return {
        type: actionTypes.START_ORDER
    }
}

export const startOrder = (order, token) => {
    return dispatch => {
        dispatch(onStartOrder());
        axios.post('/orders.json?auth=' + token, order)
            .then(response => {
                dispatch(onOrderSuccess(response.data.name, order))
            })
            .catch(error => {
                dispatch(onOrderFail(error));
            });
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

const onStartFetchOrders = () => {
    return {
        type: actionTypes.START_FETCH_ORDERS
    }
}

export const startFetchOrders = (token, userId) => {
    return dispatch => {
        dispatch(onStartFetchOrders());
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId +'"';
        axios.get('/orders.json' + queryParams)
            .then(response => {
                let fetchedOrders = [];
                for(let key in response.data) {
                    fetchedOrders.push({...response.data[key], id: key})
                };
                dispatch(fetchOrdersSuccess(fetchedOrders));
            })
            .catch( error => dispatch(fetchOrdersFail()));
    }
}

const fetchOrdersSuccess = fetchedOrders => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: fetchedOrders
    }
}

const fetchOrdersFail = error => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error
    }
}