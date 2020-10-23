import {
    POST_DELETE_FAILURE, POST_DELETE_REQUEST,
    POST_DELETE_SUCCESS,
    POST_DETAIL_LOADING_FAILURE, POST_DETAIL_LOADING_REQUEST,
    POST_DETAIL_LOADING_SUCCESS,
    POST_UPLOADING_FAILURE, POST_UPLOADING_REQUEST,
    POST_UPLOADING_SUCCESS,
    POSTS_LOADING_FAILURE,
    POSTS_LOADING_REQUEST,
    POSTS_LOADING_SUCCESS
} from '../types';
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
        yield put(push('/'));
    }
}

function* watchLoadPost() {
    yield takeEvery(POSTS_LOADING_REQUEST, loadPost);
}


// Post Upload
const uploadPostAPI = (payload) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const token = payload.token;
    if (token) {
        config.headers['x-auth-token'] = token;
    }
    return axios.post('/api/post', payload, config)
}

function* uploadPost(action) {
    try {
        const result = yield call(uploadPostAPI, action.payload);
        yield put({
            type: POST_UPLOADING_SUCCESS,
            payload: result.data,
        });
        yield put(push(`/post/${result.data._id}`));
    } catch (e) {
        yield put({
            type: POST_UPLOADING_FAILURE,
            payload: e
        })
        yield put(push('/'));
    }
}

function* watchUploadPost() {
    yield takeEvery(POST_UPLOADING_REQUEST, uploadPost);
}

// Post Detail
const loadPostDetailAPI = (payload) => {
    console.log(payload)
    return axios.get(`/api/post/${payload}`)
}

function* loadPostDetail(action) {
    try {
        const result = yield call(loadPostDetailAPI, action.payload);
        console.log(result, 'post_detail_saga_data');
        yield put({
            type: POST_DETAIL_LOADING_SUCCESS,
            payload: result.data,
        });
    } catch (e) {
        yield put({
            type: POST_DETAIL_LOADING_FAILURE,
            payload: e
        })
        yield put(push('/'));
    }
}

function* watchLoadPostDetail() {
    yield takeEvery(POST_DETAIL_LOADING_REQUEST, loadPostDetail);
}


// Delete Post
const deletePostAPI = (payload) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    const token = payload.token;

    if (token) {
        config.headers["x-auth-token"] = token;
    }
    return axios.delete(`/api/post/${payload.id}`, config);
};

function* deletePost(action) {
    try {
        const result = yield call(deletePostAPI, action.payload);
        yield put({
            type: POST_DELETE_SUCCESS,
            payload: result.data,
        });
        yield put(push(`/`));
    } catch (e) {
        yield put({
            type: POST_DELETE_FAILURE,
            payload: e
        })
    }
}

function* watchDeletePost() {
    yield takeEvery(POST_DELETE_REQUEST, deletePost);
}



export default function* postSaga() {
    yield all([
        fork(watchLoadPost),
        fork(watchUploadPost),
        fork(watchLoadPostDetail),
        fork(watchDeletePost),
    ])
}
