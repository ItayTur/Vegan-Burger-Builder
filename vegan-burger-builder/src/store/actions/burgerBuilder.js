import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

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
    return dispatch => {
        axios.get('/ingredients.json')
            .then(response => {
                dispatch(onFetchingIngredients(response.data));
            })
            .catch(error => {
                dispatch(onError());
            });
    }

};

