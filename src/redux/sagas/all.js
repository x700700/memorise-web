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

export function* getEditTraining(action) {
    try {
        yield put({ type: types.EDIT_TRAINING_START_FETCH, id: action.id });
        const resp = yield call(api.getEditTraining, { Bearer: consts.temp.bearer, id: action.id });
        yield put({ type: types.EDIT_TRAINING_FETCH_SUCCEED, training: resp });
    } catch (e) {
        yield put({ type: types.EDIT_TRAINING_FETCH_FAILED });
        yield put({ type: types.APP_AUTH_FAILED, message: e.message });
    }
}




export function* signin(action) {
    try {
        yield put({ type: types.APP_SIGNIN_STARTED });
        const resp = yield call(api.signin, { Bearer: consts.temp.bearer, body: action.body });
        yield put({ type: types.APP_SIGNIN_SUCCEED, resp: resp });
    } catch (e) {
        yield put({ type: types.APP_SIGNIN_FAILED, message: e.message });
    }
}

export function* signup(action) {
    try {
        yield put({ type: types.APP_SIGNUP_STARTED });
        const resp = yield call(api.signup, { Bearer: consts.temp.bearer, body: action.body });
        yield put({ type: types.APP_SIGNUP_SUCCEED, resp: resp });
    } catch (e) {
        yield put({ type: types.APP_SIGNUP_FAILED, message: e.message });
    }
}



export function* createTraining(action) {
    try {
        yield put({ type: types.CREATE_TRAINING_START_FETCH });
        const resp = yield call(api.createTraining, { Bearer: consts.temp.bearer });
        yield put({ type: types.CREATE_TRAINING_FETCH_SUCCEED, training: resp });
    } catch (e) {
        yield put({ type: types.CREATE_TRAINING_FETCH_FAILED, message: e.message });
    }
}

export function* renameTraining(action) {
    try {
        yield put({ type: types.RENAME_TRAINING_START_FETCH });
        const resp = yield call(api.renameTraining, { Bearer: consts.temp.bearer, id: action.id, body: action.body });
        yield put({ type: types.RENAME_TRAINING_FETCH_SUCCEED, training: resp });
    } catch (e) {
        yield put({ type: types.RENAME_TRAINING_FETCH_FAILED, message: e.message });
    }
}

export function* deleteTraining(action) {
    try {
        yield put({ type: types.DELETE_TRAINING_START_FETCH });
        const resp = yield call(api.deleteTraining, { Bearer: consts.temp.bearer, id: action.id });
        yield put({ type: types.DELETE_TRAINING_FETCH_SUCCEED, training: resp });
    } catch (e) {
        yield put({ type: types.DELETE_TRAINING_FETCH_FAILED, message: e.message });
    }
}


export function* createExercise(action) {
    try {
        yield put({ type: types.CREATE_EXERCISE_START_FETCH });
        const resp = yield call(api.createExercise, { Bearer: consts.temp.bearer, trainingId: action.trainingId });
        yield put({ type: types.CREATE_EXERCISE_FETCH_SUCCEED, exercise: resp });
    } catch (e) {
        yield put({ type: types.CREATE_EXERCISE_FETCH_FAILED, message: e.message });
    }
}

export function* saveExercise(action) {
    try {
        yield put({ type: types.SAVE_EXERCISE_START_FETCH });
        const resp = yield call(api.saveExercise, { Bearer: consts.temp.bearer, trainingId: action.trainingId, id: action.id, body: action.body });
        yield put({ type: types.SAVE_EXERCISE_FETCH_SUCCEED, exercise: resp });
    } catch (e) {
        yield put({ type: types.SAVE_EXERCISE_FETCH_FAILED, message: e.message });
    }
}

export function* deleteExercise(action) {
    try {
        yield put({ type: types.DELETE_EXERCISE_START_FETCH });
        const resp = yield call(api.deleteExercise, { Bearer: consts.temp.bearer, trainingId: action.trainingId, id: action.id });
        yield put({ type: types.DELETE_EXERCISE_FETCH_SUCCEED, exercise: resp });
    } catch (e) {
        yield put({ type: types.DELETE_EXERCISE_FETCH_FAILED, message: e.message });
    }
}
