import {GET_AUTH_FAILED, GET_AUTH_REQUEST, GET_AUTH_SUCCESS} from "../../actions/authorization";
import { AllInitialTypes } from "../../../types";

export const initialData = {
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

export type InitialAuthType = {
    authData: {
        accessToken: string,
        refreshToken: string,
        user: {
            email: string,
            name: string
        }
    },
    authRequest: boolean,
    authFailed: boolean,
};

export const authorizationReducer = (state = initialData, action: AllInitialTypes): InitialAuthType => {
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
                authData: state.authData,
                authFailed: true,
                authRequest: false
            };
        }
        default: {
            return state;
        }
    }
}