import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders: [],
    loading: false,
    isOrderSuccess: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ORDER_INIT:
            return {
                ...state,
                isOrderSuccess: false
            }
        case actionTypes.START_ORDER:
            return {
                ...state,
                loading: true
            }
        case actionTypes.ON_ORDER_SUCCESS:
            const newOrder = {
                id: action.id,
                order: action.orderData
            }
            return {
                ...state,
                loading: false,
                orders: state.orders.concat(newOrder),
                isOrderSuccess: true
            }
        case actionTypes.START_FETCH_ORDERS:
            return {
                ...state,
                loading: true
            }
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return {
                ...state,
                loading: false,
                isOrderSuccess: true,
                orders: action.orders
            }
        case actionTypes.FETCH_ORDERS_FAIL:
            return {
                ...state,
                loading: false,
                isOrderSuccess: false
            }
        default:
            return state;
    }
}

export default reducer;