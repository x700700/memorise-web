import { takeLatest, all } from 'redux-saga/effects';
import * as sagasApp from './sagasApp';
import * as sagasTrainings from './sagasTrainings';
import * as sagasExerciseEdit from './sagasExerciseEdit';
import * as types from '../actionsTypes';


function* actionWatcher() {
    yield takeLatest(types.saga.signin, sagasApp.signin);
    yield takeLatest(types.saga.signup, sagasApp.signup);
    yield takeLatest(types.saga.auth, sagasApp.auth);

    yield takeLatest(types.saga.getTrainingsList, sagasTrainings.getTrainingsList);
    yield takeLatest(types.saga.getFriendTrainingsList, sagasTrainings.getFriendTrainingsList);

    yield takeLatest(types.saga.getEditTraining, sagasTrainings.getEditTraining);
    yield takeLatest(types.saga.getGameTraining, sagasTrainings.getGameTraining);
    yield takeLatest(types.saga.getExamTraining, sagasTrainings.getExamTraining);

    yield takeLatest(types.saga.createTraining, sagasTrainings.createTraining);
    yield takeLatest(types.saga.renameTraining, sagasTrainings.renameTraining);
    yield takeLatest(types.saga.deleteTraining, sagasTrainings.deleteTraining);

    yield takeLatest(types.saga.createExercise, sagasExerciseEdit.createExercise);
    yield takeLatest(types.saga.saveExercise, sagasExerciseEdit.saveExercise);
    yield takeLatest(types.saga.deleteExercise, sagasExerciseEdit.deleteExercise);
    yield takeLatest(types.saga.getTranslate, sagasExerciseEdit.getTranslate);
}


export default function* rootSaga() {
    yield all([
        actionWatcher(),
    ]);
}
