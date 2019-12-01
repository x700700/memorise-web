import { takeLatest, all } from 'redux-saga/effects';
import * as appSagas from './app';

function* actionWatcher() {
    yield takeLatest('GET_NEWS', appSagas.fetchNews);
}
export default function* rootSaga() {
    yield all([
        actionWatcher(),
    ]);
}
