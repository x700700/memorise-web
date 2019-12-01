import { put } from 'redux-saga/effects';

export function* fetchNews() {
    const json = yield fetch('https://newsapi.org/v1/articles?source= cnn&apiKey=c39a26d9c12f48dba2a5c00e35684ecc')
        .then(response => response.json(), );
    yield put({ type: "NEWS_RECEIVED", json: json.articles, });
}
