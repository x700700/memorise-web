import { call, put } from 'redux-saga/effects';
import * as types from '../actionsTypes';
import * as api from '../api';
import consts from '../../common/consts';


export function* auth(action) {
    try {
        yield put({ type: types.APP_AUTH_STARTED });
        const resp = yield call(api.auth, { Bearer: consts.temp.bearer });
        yield put({ type: types.APP_AUTH_SUCCEED, name: resp.name });
    } catch (e) {
        yield put({ type: types.APP_AUTH_FAILED, message: e.message });
    }
}

export function* getTrainingsList(action) {
    try {
        yield put({ type: types.TRAININGS_START_FETCH });
        const resp = yield call(api.trainingsList, { Bearer: consts.temp.bearer });
        yield put({ type: types.TRAININGS_FETCH_SUCCEED, trainingsMap: resp });
    } catch (e) {
        yield put({ type: types.TRAININGS_FETCH_FAILED });
        yield put({ type: types.APP_AUTH_FAILED, message: e.message });
    }
}
