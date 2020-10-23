import {
    CATEGORY_FIND_FAILURE, CATEGORY_FIND_REQUEST,
    CATEGORY_FIND_SUCCESS,
    POST_DELETE_FAILURE,
    POST_DELETE_REQUEST,
    POST_DELETE_SUCCESS,
    POST_DETAIL_LOADING_FAILURE,
    POST_DETAIL_LOADING_REQUEST,
    POST_DETAIL_LOADING_SUCCESS,
    POST_EDIT_LOADING_FAILURE,
    POST_EDIT_LOADING_REQUEST,
    POST_EDIT_LOADING_SUCCESS, POST_EDIT_UPLOADING_FAILURE, POST_EDIT_UPLOADING_REQUEST,
    POST_EDIT_UPLOADING_SUCCESS,
    POST_UPLOADING_FAILURE,
    POST_UPLOADING_REQUEST,
    POST_UPLOADING_SUCCESS,
    POSTS_LOADING_FAILURE,
    POSTS_LOADING_REQUEST,
    POSTS_LOADING_SUCCESS, SEARCH_FAILURE, SEARCH_REQUEST, SEARCH_SUCCESS
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

// Post Edit Load
const postEditLoadAPI = (payload) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    const token = payload.token;

    if (token) {
        config.headers["x-auth-token"] = token;
    }
    return axios.get(`/api/post/${payload.id}/edit`, config);
};

function* postEditLoad(action) {
    try {
        const result = yield call(postEditLoadAPI, action.payload);
        yield put({
            type: POST_EDIT_LOADING_SUCCESS,
            payload: result.data,
        });
    } catch (e) {
        yield put({
            type: POST_EDIT_LOADING_FAILURE,
            payload: e
        })
    }
}

function* watchPostEditLoad() {
    yield takeEvery(POST_EDIT_LOADING_REQUEST, postEditLoad);
}

// Post Edit Load
const postEditUploadAPI = (payload) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    const token = payload.token;

    if (token) {
        config.headers["x-auth-token"] = token;
    }
    return axios.post(`/api/post/${payload.id}/edit`, payload, config);
};

function* postEditUpload(action) {
    try {
        const result = yield call(postEditUploadAPI, action.payload);
        yield put({
            type: POST_EDIT_UPLOADING_SUCCESS,
            payload: result.data,
        });
        yield put(push(`/post/${result.data._id}`))
    } catch (e) {
        yield put({
            type: POST_EDIT_UPLOADING_FAILURE,
            payload: e
        });
    }
}

function* watchPostEditUpload() {
    yield takeEvery(POST_EDIT_UPLOADING_REQUEST, postEditUpload);
}


// Category Find
const categoryFindAPI = (payload) => {
    return axios.get(`/api/post/category/${encodeURIComponent(payload)}`);
};

function* categoryFind(action) {
    try {
        const result = yield call(categoryFindAPI, action.payload);
        yield put({
            type: CATEGORY_FIND_SUCCESS,
            payload: result.data,
        });
    } catch (e) {
        yield put({
            type: CATEGORY_FIND_FAILURE,
            payload: e
        });
    }
}

function* watchCategoryFind() {
    yield takeEvery(CATEGORY_FIND_REQUEST, categoryFind);
}

// Search
const searchAPI = (payload) => {
    return axios.get(`/api/search/${encodeURIComponent(payload)}`);
};

function* search(action) {
    try {
        const result = yield call(searchAPI, action.payload);
        yield put({
            type: SEARCH_SUCCESS,
            payload: result.data,
        });
        yield put(push(`/search/${encodeURIComponent(action.payload)}`))
    } catch (e) {
        yield put({
            type: SEARCH_FAILURE,
            payload: e
        });
        yield put(push('/'));
    }
}

function* watchSearch() {
    yield takeEvery(SEARCH_REQUEST, search);
}

export default function* postSaga() {
    yield all([
        fork(watchLoadPost),
        fork(watchUploadPost),
        fork(watchLoadPostDetail),
        fork(watchDeletePost),
        fork(watchPostEditLoad),
        fork(watchPostEditUpload),
        fork(watchCategoryFind),
        fork(watchSearch),
    ]);
}