import {
    CLEAN_USER_DATA,
    GET_USER_FAILED,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    SET_CHECK_SUCCESS
} from "../../actions/user";
import { AllInitialTypes } from "../../../types";

export const initialData = {
    user: {
        email: "",
        name: ""
    },
    userRequest: false,
    userFailed: false,
    isAuthChecked: false,
}

type InitialUserType = {
    isAuthChecked: boolean;
    user: {
        email: string,
        name: string
    },
    userRequest: boolean,
    userFailed: boolean,
};

export const userReducer = (state = initialData, action: AllInitialTypes): InitialUserType => {
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
                userRequest: false,
                isAuthChecked: true
            };
        }
        case GET_USER_FAILED: {
            return {
                user: {
                    email: "",
                    name: ""
                },
                userFailed: true,
                userRequest: false,
                isAuthChecked: true
            };
        }
        case SET_CHECK_SUCCESS: {
            return {
                ...state,
                isAuthChecked: true
            };
        }
        case CLEAN_USER_DATA: {
            return {
                ...state,
                userFailed: false,
                user: initialData.user,
                userRequest: false,
                isAuthChecked: true
            };
        }
        default: {
            return state;
        }
    }
}