import * as actionTypes from '../actions/actionTypes';
import reducer from './auth';

describe('auth reducer', () => {
    it('should store the token upon login', () => {
        const stateToTest = reducer({
            loading: false,
            error: '',
            token: null,
            userId: null,
            path: '/'
        }, {
            type: actionTypes.AUTH_SUCCESS,
            token: 'some-token',
            userId: 'some-user-id'
        });
        expect(stateToTest).toEqual({
            loading: false,
            error: '',
            token: 'some-token',
            userId: 'some-user-id',
            path: '/'
        })
    })
})