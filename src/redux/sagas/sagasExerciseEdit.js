import { call, put } from 'redux-saga/effects';
import * as types from '../actionsTypes';
import * as api from '../api';
import consts from '../../common/consts';

export function* getTranslate(action) {
    try {
        yield put({ type: types.FETCH_TRANSLATE_START, word: action.body.word });
        const resp = yield call(api.getTranslate, { Bearer: consts.temp.bearer, body: action.body });
        yield put({ type: types.FETCH_TRANSLATE_SUCCEED, translation: resp });
    } catch (e) {
        yield put({ type: types.FETCH_TRANSLATE_FAILED, message: e.message });
        yield put({ type: types.APP_CHECK_AUTH_FAILED, e: e });
    }
}

export function* createExercise(action) {
    try {
        yield put({ type: types.FETCH_CREATE_EXERCISE_START });
        const resp = yield call(api.createExercise, { Bearer: consts.temp.bearer, trainingId: action.trainingId });
        yield put({ type: types.FETCH_CREATE_EXERCISE_SUCCEED, exercise: resp });
    } catch (e) {
        yield put({ type: types.FETCH_CREATE_EXERCISE_FAILED, message: e.message });
        yield put({ type: types.APP_CHECK_AUTH_FAILED, e: e });
    }
}

export function* saveExercise(action) {
    try {
        yield put({ type: types.FETCH_SAVE_EXERCISE_START });
        const resp = yield call(api.saveExercise, { Bearer: consts.temp.bearer, trainingId: action.trainingId, id: action.id, body: action.body });
        yield put({ type: types.FETCH_SAVE_EXERCISE_SUCCEED, exercise: resp.updatedExercise });
        yield put({ type: types.TRAININGS_SAMPLE_EXERCISE_CHANGED, sampleExercise: resp.sampleExercise });
    } catch (e) {
        yield put({ type: types.FETCH_SAVE_EXERCISE_FAILED, message: e.message });
        yield put({ type: types.APP_CHECK_AUTH_FAILED, e: e });
    }
}

export function* deleteExercise(action) {
    try {
        yield put({ type: types.FETCH_DELETE_EXERCISE_START });
        const resp = yield call(api.deleteExercise, { Bearer: consts.temp.bearer, trainingId: action.trainingId, id: action.id });
        yield put({ type: types.FETCH_DELETE_EXERCISE_SUCCEED, exercise: resp.deletedExercise });
        yield put({ type: types.TRAININGS_SAMPLE_EXERCISE_CHANGED, sampleExercise: resp.sampleExercise });
    } catch (e) {
        yield put({ type: types.FETCH_DELETE_EXERCISE_FAILED, message: e.message });
        yield put({ type: types.APP_CHECK_AUTH_FAILED, e: e });
    }
}
