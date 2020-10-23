import {
    COMMENT_LOADING_FAILURE,
    COMMENT_LOADING_REQUEST,
    COMMENT_LOADING_SUCCESS, COMMENT_UPLOADING_FAILURE,
    COMMENT_UPLOADING_REQUEST, COMMENT_UPLOADING_SUCCESS
} from '../types';

const initialState = {
    comments: [],
    creatorId: '',
    loading: '',
    isAuthenticated: false,
}

const commentReducer = (state = initialState, action) => {
    switch (action.type) {
        case COMMENT_LOADING_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case COMMENT_LOADING_SUCCESS:
            return {
                ...state,
                loading: false,
                comments: action.payload
            }
        case COMMENT_LOADING_FAILURE:
            return {
                ...state,
                loading: false,
            }
        case COMMENT_UPLOADING_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case COMMENT_UPLOADING_SUCCESS:
            return {
                ...state,
                loading: false,
                comments: [...state.comments, action.payload],
                isAuthenticated: true
            }
        case COMMENT_UPLOADING_FAILURE:
            return {
                ...state,
                loading: false,
            }
        default:
            return state;
    }
}

export default commentReducer;