import { takeLatest, all } from 'redux-saga/effects';
import * as appSagas from './all';
import * as types from '../actionsTypes';


function* actionWatcher() {
    yield takeLatest(types.saga.auth, appSagas.auth);
    yield takeLatest(types.saga.getTrainingsList, appSagas.getTrainingsList);
}


export default function* rootSaga() {
    yield all([
        actionWatcher(),
    ]);
}
