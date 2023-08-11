import {authUser} from "../../utils/api";

export const GET_AUTH_REQUEST = 'GET_AUTH_REQUEST';
export const GET_AUTH_SUCCESS = 'GET_AUTH_SUCCESS';
export const GET_AUTH_FAILED = 'GET_AUTH_FAILED';

export function getAuth({email, password}) {
    return function (dispatch) {
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