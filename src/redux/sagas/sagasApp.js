import { call, put } from 'redux-saga/effects';
import * as types from '../actionsTypes';
import * as api from '../api';
import consts from '../../common/consts';

export function* auth(action) {
    try {
        yield put({ type: types.APP_AUTH_STARTED,
            authErrorMessage: action.authErrorMessage,
            signinErrorMessage: action.signinErrorMessage,
            signupErrorMessage: action.signupErrorMessage,
            friendErrorMessage: action.friendErrorMessage,
        });
        const resp = yield call(api.auth, { Bearer: consts.temp.bearer });
        yield put({ type: types.APP_AUTH_SUCCEED, name: resp.name });
    } catch (e) {
        yield put({ type: types.APP_AUTH_FAILED, message: e.message });
    }
}

export function* signin(action) {
    try {
        yield put({ type: types.APP_SIGNIN_STARTED });
        const resp = yield call(api.signin, { body: action.body });
        yield put({ type: types.APP_SIGNIN_SUCCEED, loginResult: resp });
    } catch (e) {
        yield put({ type: types.APP_SIGNIN_FAILED, message: e.message });
    }
}

export function* signup(action) {
    try {
        yield put({ type: types.APP_SIGNUP_STARTED, nickName: action.body.nickName });
        const resp = yield call(api.signup, { Bearer: consts.temp.bearer, body: action.body });
        if (resp && resp.status && resp.status !== 200) throw resp;
        yield put({ type: types.APP_SIGNUP_SUCCEED, registerResult: resp });
    } catch (e) {
        yield put({ type: types.APP_SIGNUP_FAILED, message: e.message });
    }
}
