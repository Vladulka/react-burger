import {GET_USER_FAILED, GET_USER_REQUEST, GET_USER_SUCCESS} from "../actions/user";

const initialData = {
    user: {
        email: "",
        name: ""
    },
    userRequest: false,
    userFailed: false
}

export const userReducer = (state = initialData, action) => {
    switch (action.type) {
        case GET_USER_REQUEST: {
            return {
                ...state,
                userRequest: true
            };
        }
        case GET_USER_SUCCESS: {
            return {
                ...state,
                userFailed: false,
                user: action.data,
                userRequest: false
            };
        }
        case GET_USER_FAILED: {
            return {
                user: {},
                userFailed: true,
                userRequest: false
            };
        }
        default: {
            return state;
        }
    }
}