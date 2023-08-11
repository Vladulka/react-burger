import {registerUser} from "../../utils/api";

export const GET_REGISTER_REQUEST = 'GET_REGISTER_REQUEST';
export const GET_REGISTER_SUCCESS = 'GET_REGISTER_SUCCESS';
export const GET_REGISTER_FAILED = 'GET_REGISTER_FAILED';

export function getRegister({name, email, password}) {
    return function (dispatch) {
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