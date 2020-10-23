import axios from 'axios'
import {call, put, takeEvery, all, fork} from 'redux-saga/effects';
import {
    COMMENT_LOADING_FAILURE,
    COMMENT_LOADING_REQUEST,
    COMMENT_LOADING_SUCCESS,
    COMMENT_UPLOADING_FAILURE, COMMENT_UPLOADING_REQUEST,
    COMMENT_UPLOADING_SUCCESS
} from '../types'
import {push} from 'connected-react-router';

// Load Comment

const loadCommentsAPI = payload => {
    return axios.get(`/api/post/${payload}/comments`);
}

function* loadComments(action) {
    try {
        const result = yield call(loadCommentsAPI, action.payload);
        yield put({
            type: COMMENT_LOADING_SUCCESS,
            payload: result.data
        })
    } catch (e) {
        console.error(e);
        yield put({
            type: COMMENT_LOADING_FAILURE,
            payload: e
        })
        yield put(push('/'));
    }
}

function* watchLoadComments() {
    yield takeEvery(COMMENT_LOADING_REQUEST, loadComments);
}

// Upload Comment
const uploadCommentsAPI = payload => {
    return axios.post(`/api/post/${payload.id}/comments`, payload);
}

function* uploadComments(action) {
    try {
        const result = yield call(uploadCommentsAPI, action.payload);
        yield put({
            type: COMMENT_UPLOADING_SUCCESS,
            payload: result.data
        })
    } catch (e) {
        console.error(e);
        yield put({
            type: COMMENT_UPLOADING_FAILURE,
            payload: e
        })
        yield put(push('/'));
    }
}

function* watchUploadComments() {
    yield takeEvery(COMMENT_UPLOADING_REQUEST, uploadComments);
}

export default function* commentSaga() {
    yield all([
        fork(watchLoadComments),
        fork(watchUploadComments),
    ])
}