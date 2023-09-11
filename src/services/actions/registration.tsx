import {registerUser} from "../../utils/api";
import { IUser, TAuthResponse } from "../../types";
import { AppDispatch } from "../../utils/hooks";

export const GET_REGISTER_REQUEST: 'GET_REGISTER_REQUEST'= 'GET_REGISTER_REQUEST';
export const GET_REGISTER_SUCCESS: 'GET_REGISTER_SUCCESS' = 'GET_REGISTER_SUCCESS';
export const GET_REGISTER_FAILED: 'GET_REGISTER_FAILED' = 'GET_REGISTER_FAILED';

interface IGetRegisterRequest {
    readonly type: typeof GET_REGISTER_REQUEST;
}

interface IGetRegisterSuccess {
    readonly type: typeof GET_REGISTER_SUCCESS;
    data: TAuthResponse
}

interface IGetRegisterFailed {
    readonly type: typeof GET_REGISTER_FAILED;
}

export type InitialRegisterActionTypes = IGetRegisterRequest
    | IGetRegisterSuccess
    | IGetRegisterFailed;


export function getRegister({name, email, password}: IUser) {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: GET_REGISTER_REQUEST
        });
        return registerUser({name, email, password}).then(data => {
            if (data) {
                dispatch({
                    type: GET_REGISTER_SUCCESS,
                    data: data
                });
            } else {
                dispatch({
                    type: GET_REGISTER_FAILED
                });
            }
        })
        .catch((e) => {
            console.log(e)
        });
    };
}