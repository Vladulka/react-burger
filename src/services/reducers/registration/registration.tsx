import {GET_REGISTER_FAILED, GET_REGISTER_REQUEST, GET_REGISTER_SUCCESS} from "../../actions/registration";
import { AllInitialTypes, TAuthResponse } from "../../../types";

export const initialData = {
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

type InitialRegisterType = {
    registerData: TAuthResponse | {},
    registerRequest: boolean,
    registerFailed: boolean,
};

export const registrationReducer = (state = initialData, action: AllInitialTypes): InitialRegisterType => {
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