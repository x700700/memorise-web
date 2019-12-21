import { takeLatest, all } from 'redux-saga/effects';
import * as sagas from './allSagas';
import * as types from '../actionsTypes';


function* actionWatcher() {
    yield takeLatest(types.saga.signin, sagas.signin);
    yield takeLatest(types.saga.signup, sagas.signup);
    yield takeLatest(types.saga.auth, sagas.auth);

    yield takeLatest(types.saga.getFriendTrainingsList, sagas.getFriendTrainingsList);

    yield takeLatest(types.saga.getTrainingsList, sagas.getTrainingsList);
    yield takeLatest(types.saga.getEditTraining, sagas.getEditTraining);
    yield takeLatest(types.saga.getGameTraining, sagas.getGameTraining);
    yield takeLatest(types.saga.getExamTraining, sagas.getExamTraining);

    yield takeLatest(types.saga.createTraining, sagas.createTraining);
    yield takeLatest(types.saga.renameTraining, sagas.renameTraining);
    yield takeLatest(types.saga.deleteTraining, sagas.deleteTraining);

    yield takeLatest(types.saga.createExercise, sagas.createExercise);
    yield takeLatest(types.saga.saveExercise, sagas.saveExercise);
    yield takeLatest(types.saga.deleteExercise, sagas.deleteExercise);
    yield takeLatest(types.saga.getTranslate, sagas.getTranslate);
}


export default function* rootSaga() {
    yield all([
        actionWatcher(),
    ]);
}
