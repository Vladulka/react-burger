import {getUserData} from "../../utils/api";
import { TAuthResponse } from "../../types";
import { AppDispatch } from "../../utils/hooks";

export const GET_USER_REQUEST: 'GET_USER_REQUEST' = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS: 'GET_USER_SUCCESS' = 'GET_USER_SUCCESS';
export const GET_USER_FAILED: 'GET_USER_FAILED' = 'GET_USER_FAILED';

interface IGetUserRequest {
    readonly type: typeof GET_USER_REQUEST;
}

interface IGetUserSuccess {
    readonly type: typeof GET_USER_SUCCESS;
    data: TAuthResponse
}

interface IGetUserFailed {
    readonly type: typeof GET_USER_FAILED;
}

export type InitialUserActionTypes = IGetUserRequest
    | IGetUserSuccess
    | IGetUserFailed;


export function getUserInfo() {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: GET_USER_REQUEST
        });
        return getUserData().then(data => {
            if (data) {
                dispatch({
                    type: GET_USER_SUCCESS,
                    data: data
                });
                return data;
            } else {
                dispatch({
                    type: GET_USER_FAILED
                });
            }
        })
        .catch((e) => {
            console.log(e)
        });
    };
}