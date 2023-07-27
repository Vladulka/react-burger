import {GET_AUTH_FAILED, GET_AUTH_REQUEST, GET_AUTH_SUCCESS} from "../actions/authorization";
import {GET_ORDER_FAILED} from "../actions/order-details";

const initialData = {
    authData: {
        accessToken: "",
        refreshToken: "",
        user: {
            email: "",
            name: ""
        }
    },
    authRequest: false,
    authFailed: false
}

export const authorizationReducer = (state = initialData, action) => {
    switch (action.type) {
        case GET_AUTH_REQUEST: {
            return {
                ...state,
                authRequest: true
            };
        }
        case GET_AUTH_SUCCESS: {
            return {
                ...state,
                authFailed: false,
                authData: action.data,
                authRequest: false
            };
        }
        case GET_AUTH_FAILED: {
            return {
                authData: {},
                authFailed: true,
                authRequest: false
            };
        }
        default: {
            return state;
        }
    }
}