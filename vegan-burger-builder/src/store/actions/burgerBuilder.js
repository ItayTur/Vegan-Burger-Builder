import * as actionTypes from './actionTypes';

export const addingIngredient = ingredientName => ({
    type: actionTypes.ADD_INGREDIENT,
    ingredientName
});

export const removingIngredient = ingredientName => ({
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName
});