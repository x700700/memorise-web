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



export function* getTrainingsList(action) {
    try {
        yield put({ type: types.FETCH_TRAININGS_START });
        const resp = yield call(api.trainingsList, { Bearer: consts.temp.bearer });
        yield put({ type: types.FETCH_TRAININGS_SUCCEED, trainingsMap: resp });
    } catch (e) {
        yield put({ type: types.FETCH_TRAININGS_FAILED });
        yield put({ type: types.APP_CHECK_AUTH_FAILED, e: e });
    }
}

export function* getFriendTrainingsList(action) {
    try {
        yield put({ type: types.APP_SET_FRIEND_NAME, friendName: null });
        yield put({ type: types.FETCH_FRIEND_TRAININGS_START });
        const resp = yield call(api.friendTrainingsList, { Bearer: consts.temp.bearer, friendName: action.friendName });
        yield put({ type: types.FETCH_FRIEND_TRAININGS_SUCCEED, trainingsMap: resp });
        const friendName = resp && ((resp[Object.keys(resp)[0]] || {}).info || {}).friendName;
        yield put({ type: types.APP_SET_FRIEND_NAME, friendName: friendName });
    } catch (e) {
        yield put({ type: types.FETCH_FRIEND_TRAININGS_FAILED });
        yield put({ type: types.APP_CHECK_AUTH_FAILED, e: e });
        yield put({ type: types.APP_SET_FRIEND_NAME, friendName: null, error: e });
    }
}



export function* getEditTraining(action) {
    try {
        yield put({ type: types.FETCH_EDIT_TRAINING_START, id: action.id });
        const resp = yield call(api.getTraining, { Bearer: consts.temp.bearer, id: action.id });
        yield put({ type: types.FETCH_EDIT_TRAINING_SUCCEED, training: resp });
    } catch (e) {
        yield put({ type: types.FETCH_EDIT_TRAINING_FAILED });
        yield put({ type: types.APP_CHECK_AUTH_FAILED, e: e });
    }
}
export function* getGameTraining(action) {
    try {
        yield put({ type: types.GAME_FETCH_TRAINING_START, id: action.id });
        let resp = null;
        if (!action.friendName) {
            resp = yield call(api.getTraining, {Bearer: consts.temp.bearer, id: action.id });
        } else {
            resp = yield call(api.getFriendTraining, {Bearer: consts.temp.bearer, id: action.id, friendName: action.friendName });
        }
        yield put({ type: types.GAME_FETCH_TRAINING_SUCCEED, training: resp });
        yield put({ type: types.GAME_SET_TRAINING_ID, id: null });
    } catch (e) {
        yield put({ type: types.GAME_FETCH_TRAINING_FAILED });
        yield put({ type: types.APP_CHECK_AUTH_FAILED, e: e });
    }
}
export function* getExamTraining(action) {
    try {
        yield put({ type: types.EXAM_FETCH_TRAINING_START, id: action.id });
        let resp = null;
        if (!action.friendName) {
            resp = yield call(api.getTraining, {Bearer: consts.temp.bearer, id: action.id});
        } else {
            resp = yield call(api.getFriendTraining, {Bearer: consts.temp.bearer, id: action.id, friendName: action.friendName });
        }
        yield put({ type: types.EXAM_FETCH_TRAINING_SUCCEED, training: resp });
        yield put({ type: types.EXAM_SET_TRAINING_ID, id: null });
    } catch (e) {
        yield put({ type: types.EXAM_FETCH_TRAINING_FAILED });
        yield put({ type: types.APP_CHECK_AUTH_FAILED, e: e });
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



export function* createTraining(action) {
    try {
        yield put({ type: types.FETCH_CREATE_TRAINING_START });
        const resp = yield call(api.createTraining, { Bearer: consts.temp.bearer });
        yield put({ type: types.FETCH_CREATE_TRAINING_SUCCEED, training: resp });
    } catch (e) {
        yield put({ type: types.FETCH_CREATE_TRAINING_FAILED, message: e.message });
        yield put({ type: types.APP_CHECK_AUTH_FAILED, e: e });
    }
}

export function* renameTraining(action) {
    try {
        yield put({ type: types.FETCH_RENAME_TRAINING_START, name: action.body.name });
        const resp = yield call(api.renameTraining, { Bearer: consts.temp.bearer, id: action.id, body: action.body });
        yield put({ type: types.FETCH_RENAME_TRAINING_SUCCEED, training: resp });
        yield put({ type: types.TRAININGS_RENAME, training: resp });
    } catch (e) {
        yield put({ type: types.FETCH_RENAME_TRAINING_FAILED, message: e.message });
        yield put({ type: types.APP_CHECK_AUTH_FAILED, e: e });
    }
}

export function* deleteTraining(action) {
    try {
        yield put({ type: types.FETCH_DELETE_TRAINING_START });
        const resp = yield call(api.deleteTraining, { Bearer: consts.temp.bearer, id: action.id });
        yield put({ type: types.FETCH_DELETE_TRAINING_SUCCEED, training: resp });
        yield put({ type: types.TRAINING_RESET });
    } catch (e) {
        yield put({ type: types.FETCH_DELETE_TRAINING_FAILED, message: e.message });
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
