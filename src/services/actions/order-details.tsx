import {getOrderDetailsData} from "../../utils/api";
import {DROP_CONSTRUCTOR} from "./burger-constructor"
import { IOrderDetails } from "../../types";
import { AppDispatch } from "../../utils/hooks";

export const GET_ORDER_REQUEST: 'GET_ORDER_REQUEST' = 'GET_ORDER_REQUEST';
export const GET_ORDER_FAILED: 'GET_ORDER_FAILED' = 'GET_ORDER_FAILED';
export const GET_ORDER_SUCCESS: 'GET_ORDER_SUCCESS' = 'GET_ORDER_SUCCESS';

interface IGetOrderRequest {
    readonly type: typeof GET_ORDER_REQUEST;
}

interface IGetOrderSuccess {
    readonly type: typeof GET_ORDER_SUCCESS;
    data: IOrderDetails
}

interface IGetOrderFailed {
    readonly type: typeof GET_ORDER_FAILED;
}

export type InitialOrderActionTypes = IGetOrderRequest
    | IGetOrderSuccess
    | IGetOrderFailed;

export function getOrderDetails(ingredients: Array<string | undefined> ) {

    return function (dispatch: AppDispatch) {
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