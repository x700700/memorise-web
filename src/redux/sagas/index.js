import { takeLatest, all } from 'redux-saga/effects';
import * as appSagas from './app';
import * as types from '../actionsTypes';


function* actionWatcher() {
    yield takeLatest(types.saga.auth, appSagas.auth);
}


export default function* rootSaga() {
    yield all([
        actionWatcher(),
    ]);
}
