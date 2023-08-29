import {GET_USER_FAILED, GET_USER_REQUEST, GET_USER_SUCCESS} from "../actions/user";
import { AllInitialTypes, IIngredient, TAuthDataResponse } from "../../types";

const initialData = {
    user: {
        email: "",
        name: ""
    },
    userRequest: false,
    userFailed: false
}

type InitialUserType = {
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
                userRequest: false
            };
        }
        case GET_USER_FAILED: {
            return {
                user: {
                    email: "",
                    name: ""
                },
                userFailed: true,
                userRequest: false
            };
        }
        default: {
            return state;
        }
    }
}