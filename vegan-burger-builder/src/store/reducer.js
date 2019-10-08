import * as actionTypes from './actions';

const initialState = {
    ingredients: {
        salad: 0,
        "soy-cheese": 0,
        "beyond-meat": 0, 
        "veggie-bacon": 0
    },
    totalPrice: 4
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
        default: 
        return state;
    }
}

export default reducer;