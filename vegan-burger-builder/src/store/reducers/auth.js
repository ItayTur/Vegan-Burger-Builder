import * as actionTypes from '../actions/actionTypes';
import updateObject from '../utility';

const initialState = {
    loading: false,
    error: '',
    token: null,
    userId: null,
    path: '/'
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.START_AUTH:
            return {
                ...state,
                loading: true
            }
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                loading: false,
                error: '',
                token: action.token,
                userId: action.userId
            }
        case actionTypes.AUTH_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case actionTypes.AUTH_LOGOUT: 
            return updateObject(state, {token: null, userId: null})
        case actionTypes.AUTH_REDIRECT_PATH:
            return updateObject(state, {path: action.path})
        default:
            return state;
    }
}

export default reducer;
