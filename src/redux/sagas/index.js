import { takeLatest, all } from 'redux-saga/effects';
import * as appSagas from './all';
import * as types from '../actionsTypes';


function* actionWatcher() {
    yield takeLatest(types.saga.signin, appSagas.signin);
    yield takeLatest(types.saga.signup, appSagas.signup);
    yield takeLatest(types.saga.auth, appSagas.auth);

    yield takeLatest(types.saga.getTrainingsList, appSagas.getTrainingsList);
    yield takeLatest(types.saga.getEditTraining, appSagas.getEditTraining);
    yield takeLatest(types.saga.getGameTraining, appSagas.getGameTraining);
    yield takeLatest(types.saga.getExamTraining, appSagas.getExamTraining);

    yield takeLatest(types.saga.createTraining, appSagas.createTraining);
    yield takeLatest(types.saga.renameTraining, appSagas.renameTraining);
    yield takeLatest(types.saga.deleteTraining, appSagas.deleteTraining);

    yield takeLatest(types.saga.createExercise, appSagas.createExercise);
    yield takeLatest(types.saga.saveExercise, appSagas.saveExercise);
    yield takeLatest(types.saga.deleteExercise, appSagas.deleteExercise);
}


export default function* rootSaga() {
    yield all([
        actionWatcher(),
    ]);
}
