import {POSTS_LOADING_FAILURE, POSTS_LOADING_REQUEST, POSTS_LOADING_SUCCESS} from '../types';
import {put, takeEvery, all, fork, call} from 'redux-saga/effects';
import {push} from 'connected-react-router';
import axios from 'axios';

// All Posts load

const loadPostAPI = () => {
    return axios.get('/api/post')
}

function* loadPost() {
    try {
        const result = yield call(loadPostAPI);
        yield put({
            type: POSTS_LOADING_SUCCESS,
            payload: result.data,
        })

    } catch (e) {
        yield put({
            type: POSTS_LOADING_FAILURE,
            payload: e
        })
        yield push('/');
    }
}

function* watchLoadPost() {
    yield takeEvery(POSTS_LOADING_REQUEST, loadPost);
}

export default function* postSaga() {
    yield all([
        fork(watchLoadPost)
    ])
}
