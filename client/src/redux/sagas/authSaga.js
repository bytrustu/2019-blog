import axios from 'axios'
import {call, put, takeEvery, all, fork} from 'redux-saga/effects';
import {
    CLEAR_ERROR_FAILURE,
    CLEAR_ERROR_REQUEST,
    CLEAR_ERROR_SUCCESS,
    LOGIN_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGOUT_FAILURE,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS, PASSWORD_EDIT_UPLOADING_FAILURE, PASSWORD_EDIT_UPLOADING_REQUEST,
    PASSWORD_EDIT_UPLOADING_SUCCESS,
    REGISTER_FAILURE,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    USER_LOADING_FAILURE,
    USER_LOADING_REQUEST,
    USER_LOADING_SUCCESS
} from '../types'

// Login
const loginUserAPI = (loginData) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    }
    return axios.post('api/auth', loginData, config);
}

function* loginUser(action) {
    try {
        const result = yield call(loginUserAPI, action.payload);
        yield put({
            type: LOGIN_SUCCESS,
            payload: result.data
        })
    } catch (e) {
        yield put({
            type: LOGIN_FAILURE,
            payload: e.response
        })
    }
}

function* watchLoginUser() {
    yield takeEvery(LOGIN_REQUEST, loginUser);
}

// LOGOUT
function* logout(action) {
    try {
        yield put({
            type: LOGOUT_SUCCESS,
        })
    } catch (e) {
        yield put({
            type: LOGOUT_FAILURE,
        })
        console.log(e);
    }
}

function* watchLogout() {
    yield takeEvery(LOGOUT_REQUEST, logout);
}

// clear Error
function* clearError() {
    try {
        yield put({
            type: CLEAR_ERROR_SUCCESS,
        });
    } catch (e) {
        yield put({
            type: CLEAR_ERROR_FAILURE,
        });
        console.error(e);
    }
}

function* watchClearError() {
    yield takeEvery(CLEAR_ERROR_REQUEST, clearError);
}

// User Loading
const userLoadingAPI = (token) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    if (token) {
        config.headers["x-auth-token"] = token;
    }
    return axios.get("api/auth/user", config);
};

function* userLoading(action) {
    try {
        const result = yield call(userLoadingAPI, action.payload);
        yield put({
            type: USER_LOADING_SUCCESS,
            payload: result.data,
        });
    } catch (e) {
        yield put({
            type: USER_LOADING_FAILURE,
            payload: e.response,
        });
    }
}

function* watchUserLoading() {
    yield takeEvery(USER_LOADING_REQUEST, userLoading);
}

// Login
const registerUserAPI = (req) => {
    return axios.post('api/user', req);
}

// Register
function* registerUser(action) {
    try {
        const result = yield call(registerUserAPI, action.payload);
        yield put({
            type: REGISTER_SUCCESS,
            payload: result.data
        })
    } catch (e) {
        yield put({
            type: REGISTER_FAILURE,
            payload: e.response
        })
    }
}

function* watchRegisterUser() {
    yield takeEvery(REGISTER_REQUEST, registerUser);
}

// Edit Password
const editPasswordAPI = (payload) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    const token = payload.token;
    if (token) {
        config.headers["x-auth-token"] = token;
    }
    return axios.post(`/api/user/${payload.userName}/profile`, payload, config);
};

function* editPassword(action) {
    try {
        const result = yield call(editPasswordAPI, action.payload);
        yield put({
            type: PASSWORD_EDIT_UPLOADING_SUCCESS,
            payload: result,
        });
    } catch (e) {
        yield put({
            type: PASSWORD_EDIT_UPLOADING_FAILURE,
            payload: e.response,
        });
    }
}

function* watchEditPassword() {
    yield takeEvery(PASSWORD_EDIT_UPLOADING_REQUEST, editPassword);
}


export default function* authSaga() {
    yield all([
        fork(watchLoginUser),
        fork(watchLogout),
        fork(watchClearError),
        fork(watchUserLoading),
        fork(watchRegisterUser),
        fork(watchEditPassword),
    ])
}