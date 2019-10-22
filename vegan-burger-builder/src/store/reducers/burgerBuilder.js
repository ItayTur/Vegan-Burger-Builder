import * as actionTypes from '../actions/actionTypes';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false
}


const INGREDIENTS_PRICES = {
    salad: 0.5,
    "soy-cheese": 0.4,
    "beyond-meat": 1.3,
    "veggie-bacon": 0.7
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.ingredientName]
            };
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
                    totalPrice: state.totalPrice - INGREDIENTS_PRICES[action.ingredientName]
                }
            };
        case actionTypes.FETCHING_INGREDIENTS:
            return {
                ...state,
                ingredients: action.ingredients,
                error: false,
                totalPrice: 4
            }
        case actionTypes.ON_ERROR: 
            return {
                ...state,
                error: true
            }
        default: 
        return state;
    }
}

export default reducer;