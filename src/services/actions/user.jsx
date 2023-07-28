import {getUserData} from "../../utils/api";

export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILED = 'GET_USER_FAILED';

export function getUserInfo() {
    return function (dispatch) {
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
        });
    };
}