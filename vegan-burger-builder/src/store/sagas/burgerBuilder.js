import { put } from 'redux-saga/effects';
import axios from '../../axios-orders';
import * as actions from '../actions';

export function* fetchingIngridentsSaga(action) {
    try {
        const response = yield axios.get('/ingredients.json')
        yield put(actions.onFetchingIngredients(response.data));
    } catch (error) {
        yield put(actions.onError());
    }
}