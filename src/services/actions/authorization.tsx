import {authUser} from "../../utils/api";
import { TAuthDataResponse, TAuthUser } from "../../types";
import { AppDispatch } from "../../utils/hooks";

export const GET_AUTH_REQUEST: 'GET_AUTH_REQUEST' = 'GET_AUTH_REQUEST';
export const GET_AUTH_SUCCESS: 'GET_AUTH_SUCCESS' = 'GET_AUTH_SUCCESS';
export const GET_AUTH_FAILED: 'GET_AUTH_FAILED' = 'GET_AUTH_FAILED';

interface IGetAuthRequest {
    readonly type: typeof GET_AUTH_REQUEST;
}

interface IGetAuthSuccess {
    readonly type: typeof GET_AUTH_SUCCESS;
    data: TAuthDataResponse
}

interface IGetAuthFailed {
    readonly type: typeof GET_AUTH_FAILED;
}

export type InitialAuthActionTypes = IGetAuthRequest
    | IGetAuthSuccess
    | IGetAuthFailed;


export function getAuth({email, password}: TAuthUser) {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: GET_AUTH_REQUEST
        });
        return authUser({email, password}).then(data => {
            if (data) {
                dispatch({
                    type: GET_AUTH_SUCCESS,
                    data: data
                });
            } else {
                dispatch({
                    type: GET_AUTH_FAILED
                });
            }
        })
        .catch((e) => {
            console.log(e)
        });
    };
}