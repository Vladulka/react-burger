import {getOrderDetailsData} from "../../utils/api";
import {DROP_CONSTRUCTOR} from "./burger-constructor"

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';

export function getOrderDetails(ingredients) {
    return function (dispatch) {
        dispatch({
            type: GET_ORDER_REQUEST
        });
        getOrderDetailsData(ingredients).then(data => {
            if (data) {
                dispatch({
                    type: GET_ORDER_SUCCESS,
                    data: data
                });
                dispatch({
                    type: DROP_CONSTRUCTOR
                });
            } else {
                dispatch({
                    type: GET_ORDER_FAILED
                });
            }
        })
        .catch((e) => {
            console.log(e)
        });
    };
}