import * as actionTypes from '../actions/actionTypes';
import updateObject from '../utility';

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

const addIngredient = (state, action) => {
    const newIngredients = updateObject(state.ingredients, { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 });
            const newState = updateObject(state, { ingredients: newIngredients, totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.ingredientName] })
            return newState;
}

const removeIngredient = (state, action) => {
    const newIngs = updateObject(state.ingredients, { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 });
            const newSt = updateObject(state, { ingredients: newIngs, totalPrice: state.totalPrice - INGREDIENTS_PRICES[action.ingredientName] })
            return newSt;
}

const fetchIngredients = (state, action) => {
    return updateObject(state, {
        ingredients: action.ingredients,
        error: false,
        totalPrice: 4
    })
}

const onError = (state, action) => {
    return updateObject(
        state,
        {
            error: true
        })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);            
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
        case actionTypes.FETCHING_INGREDIENTS: return fetchIngredients(state, action);            
        case actionTypes.ON_ERROR: return onError(state, action);
        default: return state;
    }
}

export default reducer;