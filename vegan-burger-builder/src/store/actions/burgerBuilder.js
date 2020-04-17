import * as actionTypes from './actionTypes';

export const addingIngredient = ingredientName => ({
    type: actionTypes.ADD_INGREDIENT,
    ingredientName
});

export const removingIngredient = ingredientName => ({
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName
});

export const onFetchingIngredients = ingredients => ({
    type: actionTypes.FETCHING_INGREDIENTS,
    ingredients
});

export const onError = () => ({
    type: actionTypes.ON_ERROR
});

export const fetchingIngredients = () => {
    return {
        type: actionTypes.START_FETCHING_INGREDIENTS
    }
};

