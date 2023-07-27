import {GET_REGISTER_FAILED, GET_REGISTER_REQUEST, GET_REGISTER_SUCCESS} from "../actions/registration";

const initialData = {
    registerData: {
        accessToken: "",
        refreshToken: "",
        user: {
            email: "",
            name: ""
        }
    },
    registerRequest: false,
    registerFailed: false
}

export const registrationReducer = (state = initialData, action) => {
    switch (action.type) {
        case GET_REGISTER_REQUEST: {
            return {
                ...state,
                registerRequest: true
            };
        }
        case GET_REGISTER_SUCCESS: {
            return {
                ...state,
                registerFailed: false,
                registerData: action.data,
                registerRequest: false
            };
        }
        case GET_REGISTER_FAILED: {
            return {
                registerData: {},
                registerFailed: true,
                registerRequest: false
            };
        }
        default: {
            return state;
        }
    }
}